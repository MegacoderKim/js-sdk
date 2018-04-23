import {Component, OnInit} from "@angular/core";
import {ActionService} from "../action.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "underscore";
import {TimeString, DateString, NameCase} from "ht-utility";
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
import {filter} from "rxjs/operators";

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
      label: 'Unique Id',
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
    let sub = this.getPageData().pipe(filter(data => !!data)).subscribe(data => {
      this.items = data;
      this.actionsData = data;
      this.dataResult = data;
      this.actionDataResult = this.formattedActionsResultData(data.results);
    });


    this.subs.push(sub)
  }

  getOrdering$() {
    return this.store.select(fromRoot.getQueryActionSorting)
  }

  openAction(action: IAction) {
    if(action.user) {
      this.router.navigate(['./', {id: action.id}], {relativeTo: this.route, queryParamsHandling: 'preserve'})
    } else {
      this.snackbarService.displayErrorToast('Action has no user assigned')
    }
  }

  formattedActionsResultData(data: IAction[]): IAction[] {
    if (!data) return [];
    return data.map((action: IAction) => {
      let completed_at = action.completed_at || action.eta;
      return {
        ...action,
        completed_at: completed_at ? `${TimeString(completed_at)}, ${DateString(completed_at, 'short')}` : "--",
        created_at: action.created_at ? `${TimeString(action.created_at)}, ${DateString(action.created_at, 'short')}` : "--",
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
