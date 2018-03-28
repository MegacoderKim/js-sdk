import {Component, OnInit} from "@angular/core";
import {ActionService} from "../action.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "underscore";
import {TimeString, DateString, NameCase} from "ht-utility";
import {timeParse} from "d3-time-format";
import {bisector, extent, max} from "d3-array";
import {scaleTime} from "d3-scale";
import {timeDay} from "d3-time";
import {BroadcastService} from "../../core/broadcast.service";
import * as fromAction from "../../actions/action";
import * as fromRoot from "../../reducers";
import {ContainerService} from "../../container/container.service";
import {Store} from "@ngrx/store";
import {anim} from "../../../utils/animations";
import {AccountUsersService} from "../../account/account-users.service";
import {IAccount, IAction} from "ht-models";
import {ActionsListComponent} from "../../container/actions-list/actions-list.component";
import {config} from "../../config";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-analytics-actions',
  templateUrl: './analytics-actions.component.html',
  styleUrls: ['./analytics-actions.component.less'],
  animations: [
      anim.overlay
  ]
})
export class AnalyticsActionsComponent extends ActionsListComponent implements OnInit {
  errorMessage;
  dataResult: any;
  actionsData: any;
  actionDataResult:  any[];
  dataColumns = [
    {
      label: 'Unique',
      sortOrder: '-',
      key: 'unique_id'

    },
    {
      label: 'Type',
      sortOrder: '-',
      key: 'type'

    },
    {
      label: 'User',
      sortOrder: '-',
      key: 'user__name'

    },
    {
      label: 'Status',
      sortOrder: '-',
      key: 'status'
    },
    {
      label: 'Created at',
      sortOrder: '-',
      key: 'created_at'
    },
    {
      label: 'Completion Time/ETA',
      sortOrder: '-',
      key: 'completed_at'
    },
    {
      label: 'Duration',
      sortOrder: '-',
      key: 'duration'
    },
    {
      label: 'Distance',
      sortOrder: '-',
      key: 'distance'
    },
  ];
  activeSortColumnKey = 'created_at';
  graphData: any = null;
  isNotPremium: boolean = false;
  timezone = config.timezone;
  constructor(
    public actionService: ActionService,
    private router: Router,
    public route: ActivatedRoute,
    private containerService: ContainerService,
    public store: Store<fromRoot.State>,
    public broadcast: BroadcastService,
    private accountUserService: AccountUsersService,
    private snackbarService: SnackbarService
  )
  {
    super(route, broadcast, store, actionService);
  }

  ngOnInit() {
    this.containerService.setEntity('actions');
    this.containerService.setView('list');
    super.ngOnInit();
    this.detailListener();
    this.fillData();
    this.accountUserService.getAccount().filter(data => !!data).take(1).subscribe((account: IAccount) => {
      this.isNotPremium = account.tier == 'free' && config.tokenType == 'production';
    })
  }

  handleSorting(key, sortOrder?) {
    if (!key || !!this.errorMessage || !this.actionsData || (this.actionsData.results && this.actionsData.results.length === 0)) return;
    let selectedSortColumn = _.find(this.dataColumns, column => {
      return column.key == key;
    });
    let activeSortColumn = _.find(this.dataColumns, column => {
      return column.key == this.activeSortColumnKey;
    });
    let newSortOrder = '-';
    if (sortOrder) {
      newSortOrder = sortOrder;
    } else if (selectedSortColumn.key === activeSortColumn.key) {
      newSortOrder = this.getReverseSortOrder(activeSortColumn.sortOrder);
    } else {
      newSortOrder = selectedSortColumn.sortOrder;
    }
    this.activeSortColumnKey = key;
    let newOrdering = (newSortOrder === '-') ? `-${key}` : key;
    this.dataColumns = this.dataColumns.map((column) => {
      if (column.key === key) {
        return {
          ...column,
          sortOrder: newSortOrder
        }
      }
      return {...column}
    });
    //this.loading.sort = true;
    this.updatePageQuery({ordering: newOrdering})
    //this.filter.next({ordering: newOrdering, page: 1});
  }

  getReverseSortOrder(sortOrder) {
    if (sortOrder === '+') return '-';
    if (sortOrder === '-') return '+';
  }

  private fillData() {
    let sub = this.getPageData().filter(data => !!data).subscribe(data => {
      this.items = data;
      this.actionsData = data;
      this.dataResult = data;
      this.actionDataResult = this.formattedActionsResultData(data.results);
    });

    let sub2 = this.store.select(fromRoot.getActionGraph).filter(data => !!data).subscribe((data) => {
      this.fillGraphData(data);
    });

    this.subs.push(sub, sub2)
  }

  getOrdering$() {
    return this.store.select(fromRoot.getQueryActionSorting)
  }

  // getGraphApi(query) {
  //   return this.actionService.graph(query);
  // }

  updateGraphData(data) {
    this.store.dispatch(new fromAction.SetActionGraph(data))
  }

  fillGraphData(graphData) {
    if (!graphData) {
      this.graphData = null;
      return;
    }
    let objData = _.values(graphData);
    if (objData.length > 0) {
      let parseTime = timeParse("%Y-%m-%d");
      let data = objData.map((d) => {
        return {
          ...d,
          created_date: parseTime(d.created_date)
        };
      });
      data = this.interpolateGraphData(data);
      let dataSets = [];
      let createdTasksData = data.map((d) => {
        return {
          x: d.created_date,
          y: d.created || 0
        }
      }).sort(this.sortByDateAscending);
      let assignedTasksData = data.map((d) => {
        return {
          x: d.created_date,
          y: d.assigned || 0
        }
      }).sort(this.sortByDateAscending);
      let canceledTasksData = data.map((d) => {
        return {
          x: d.created_date,
          y: (d.canceled + d.completed) || 0,
          labelY: d.canceled
        }
      }).sort(this.sortByDateAscending);
      let completedTasksData = data.map((d) => {
        return {
          x: d.created_date,
          y: d.completed || 0
        }
      }).sort(this.sortByDateAscending);
      let xAxis = createdTasksData.map((d) => {
        return d.x;
      });
      dataSets.push({
        label: 'Created',
        fill: '#56D990',
        data: createdTasksData
      });
      dataSets.push({
        label: 'Assigned',
        fill: '#5FB9FB',
        data: assignedTasksData
      });
      dataSets.push({
        label: 'Canceled',
        fill: '#F6CB66',
        data: canceledTasksData
      });
      dataSets.push({
        label: 'Completed',
        fill: '#FB7C7C',
        data: completedTasksData
      });
      let domainX = extent([...xAxis], function(d) { return d; });
      let domainY = [0, max([...createdTasksData, ...assignedTasksData, ...canceledTasksData, ...completedTasksData], function(d) { return d.y; })];
      this.graphData = {
        dataSets: dataSets,
        domainX: domainX,
        domainY: domainY,
        xAxis: xAxis,
        getIndexPosition(mouseX) {
          let bisectDate = bisector(function(d: any) { return d }).left;
          let i = bisectDate(xAxis, mouseX);
          let d0 = xAxis[i - 1];
          let d1 = xAxis[i];
          return (mouseX - d0 > d1 - mouseX ? i : i - 1);
        },
        getDataSetYValues(xValue, dataSets) {
          let yValues = [];
          dataSets.forEach((dataSet) => {
            let d = dataSet.data.find((d) => {
              return (d.x.getTime() === xValue.getTime());
            });
            yValues.push({
              y: d.y,
              labelY: d.labelY,
              fill: dataSet.fill,
              label: dataSet.label
            });
          });
          return yValues;
        }
      };
    } else {
      this.graphData = null;
    }
  }

  interpolateGraphData(data) {
    let xAxis = data.map((d) => {
      return d.created_date;
    }).sort(this.sortByDateAscending);
    if (xAxis.length === 1) {
      let prevDay = new Date();
      prevDay.setDate(xAxis[0].getDate() - 1);
      xAxis.unshift(prevDay);
    }
    // let domainX = extent([...xAxis], function(d) { return d; });
    // let dateTicks = scaleTime().domain(domainX).ticks(timeDay);
    let dateTicks = scaleTime().domain([xAxis[0], _.last(xAxis)]).ticks(timeDay);
    let interpolatedData = dateTicks.map(function(date) {
      let value = _.find(data, (d: any) => {
        return (d.created_date.getTime() === date.getTime());
      });
      if (!value) {
        value = {
          created_date: date,
          created_tasks: 0,
          assigned_tasks: 0,
          started_tasks: 0,
          completed_tasks: 0
        }
      }
      return value;
    });
    return interpolatedData;
  }

  sortByDateAscending(a, b) {
    // Dates will be cast to numbers:
    return a.x - b.x;
  }

  openAction(action: IAction) {
    if(action.user) {
      this.router.navigate(['./', {id: action.id}], {relativeTo: this.route, queryParamsHandling: 'preserve'})
    } else {
      this.snackbarService.displayErrorToast('Action has no user assigned')
    }
  }

  formattedActionsResultData(data: any) {
    if (!data) return [];
    return data.map((action: IAction) => {
      let completed_at = action.completed_at || action.eta;
      return {
        ...action,
        type: NameCase(action.type),
        lookup_id: action.unique_id ? action.unique_id : '—',
        completed_at: completed_at ? `${TimeString(completed_at)}, ${DateString(completed_at, 'short')}` : '—',
        assigned_at: action.created_at ? `${TimeString(action.created_at)}, ${DateString(action.created_at, 'short')}` : '—',
      }
    });
  }

  getActionTypeString(type: string): string {
    switch(type) {
      case 'task':
        return "Task";
      case 'pickup':
        return 'Pick Up';
      case 'delivery':
        return 'Delivery';
      case 'visit':
        return 'Visit';
      case 'stopover':
        return 'Stopover';
      default:
        return NameCase(type)
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy()
  }
}
