import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {BroadcastService} from "../../core/broadcast.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IFilter, IRange} from "../../model/common";
import {ActionService} from "../action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IAction, IActionHeatPage, IActionMap, IActionPage} from "ht-models";
import * as _ from "underscore";
import * as fromAction from "../../actions/action";
import * as fromUser from "../../actions/user";
import * as fromUi from "../../actions/ui";
import * as fromRoot from "../../reducers";
import * as fromQuery from "../../actions/query";
import {Store} from "@ngrx/store";
import {IsRangeToday, OffsetIsoTime} from "ht-utility";
import {ContainerService} from "../../container/container.service";
import {LiveActionComponent} from "./live-action/live-action.component";
import {anim} from "../../../utils/animations";
import {ActionsListComponent} from "../../container/actions-list/actions-list.component";
import {InnerMapService} from "../../map-container/map.service";
import {htAction} from "ht-data";
import {Page} from "ht-models";
import {Observable} from "rxjs/Observable";
import {config} from "../../config";
import {startOfToday} from 'date-fns';
import {HtActionsService} from "ht-angular";

@Component({
  selector: 'app-live-actions',
  templateUrl: './live-actions.component.html',
  styleUrls: ['./live-actions.component.less'],
  animations: [
    anim.popup,
    anim.appear
  ]
})
export class LiveActionsComponent extends ActionsListComponent implements OnInit {
  filters: IFilter[] = [
    {
      query: {
        ordering: '-created_at',
        status: 'assigned,started,completed',
        page_size: 15,
        min_assigned_at: startOfToday().toISOString()
      },
      newSetQuery: function (item) {
        return {'min_created_at': OffsetIsoTime(item[this.params])}
      },
      nextSetQuery: function (item) {
        return { 'max_created_at': OffsetIsoTime(item[this.params], -10)}
      },
      params: 'assigned_at',
      name: 'All',
      mapFilter: (actionMap: IActionMap) => (actionMap.status == 'assigned' || actionMap.status == 'started' || actionMap.status == 'completed')
    },
    {
      query: {
        ordering: '-created_at',
        status: 'created',
        page_size: 15,
        min_created_at: startOfToday().toISOString(),
      },
      newSetQuery: function (item) {
        return {'min_created_at': OffsetIsoTime(item[this.params])}
      },
      nextSetQuery: function (item) {
        return { 'max_created_at': OffsetIsoTime(item[this.params], -10)}
      },
      params: 'created_at',
      name: 'Created',
      mapFilter: (actionMap: IActionMap) => actionMap.status == 'created'
    },
    {
      query: {
        ordering: '-assigned_at',
        status: 'assigned,started',
        page_size: 15,
        min_assigned_at: startOfToday().toISOString()
      },
      newSetQuery: function (item) {
        return {'min_assigned_at': OffsetIsoTime(item[this.params])}
      },
      nextSetQuery: function (item) {
        return { 'max_assigned_at': OffsetIsoTime(item[this.params], -10)}
      },
      params: 'assigned_at',
      name: 'Assigned',
      mapFilter: (actionMap: IActionMap) => (actionMap.status == 'assigned' || actionMap.status == 'started')
    },
    {
      query: {
        ordering: '-completed_at',
        status: 'completed',
        page_size: 15,
        min_completed_at: startOfToday().toISOString()
      },
      newSetQuery: function (item) {
        return {'min_completed_at': OffsetIsoTime(item[this.params])}
      },
      nextSetQuery: function (item) {
        return { 'max_completed_at': OffsetIsoTime(item[this.params], -10)}
      },
      params: 'completed_at',
      name: 'Completed',
      mapFilter: (actionMap: IActionMap) => actionMap.status == 'completed'
    },
  ];
  overviewFilter = [
    {
      query: {
        min_created_at: startOfToday().toISOString()
      },
      params: [
        'started',
          'assigned',
          'created',
          'completed'
      ]
    }
  ];
  selectedFiler$:  BehaviorSubject<IFilter> =  new BehaviorSubject(this.filters[0]);
  loading = {
    actions: true,
    overview: true
  };
  overview;
  actionSummary = [
    {
      name: 'Not Yet Started',
      keys: ['created'],
      value: 0
    },
    {
      name: 'Assigned',
      keys: ['assigned', 'started'],
      value: 0
    },
    {
      name: 'Completed',
      keys: ['completed'],
      value: 0
    }
  ];
  hoveredItemKey: string | null;
  totalActions: number;
  isToday: boolean;
  summary$;
  @ViewChildren(LiveActionComponent, { read: ElementRef }) actionCard: QueryList<LiveActionComponent>;
  constructor(
      public actionService: ActionService,
      public broadcast: BroadcastService,
      public route: ActivatedRoute,
      private router: Router,
      public store: Store<fromRoot.State>,
      private containerService: ContainerService,
      private mapService: InnerMapService,
      private actionsService: HtActionsService
  ) {
    super(route, broadcast, store, actionService);
    this.summary$ = this.actionsService.summary.summaryChart$;
  }

  ngOnInit() {
    this.containerService.setEntity('actions');
    this.containerService.setView('map');
    super.ngOnInit();
    this.detailListener();
    this.fillData();
    this.getMapList();
  }

  setStatusFilter(overview) {
    let query = {status: overview.keys.toString()};
    this.store.dispatch(new fromQuery.UpdateActionListQueryQueryAction(query))
  }

  onListDateQueryChange(query) {
    let status = query.status;
    let search = query.search;
    let userMarkerFilters = [];
    if(status) {
      userMarkerFilters.push(htAction().getMarkerFilter(status))
    } else if(search) {
      userMarkerFilters.push(htAction().getMarkerSeached(search), htAction().getMarkerFilter(status));
    }
    let userMarkerFilter = (this.selectedActionId) ? (user) => false : (user) => {
      return _.reduce(userMarkerFilters, (acc, filter: (user) => boolean) => {
        return acc && filter(user)
      }, true)
    };
    if(status || search) this.updateActionMap(query);
    this.store.dispatch(new fromAction.SetActionsMapFilterAction(userMarkerFilter));
    super.onListDateQueryChange(query)
  }

  onQueryChange(query) {
    this.unselectAction();
    super.onQueryChange(query)
  }

  updateActionMap(query) {
    let actionPlace$ = (query) => this.store.select(fromRoot.getQueryDateRange)
        .take(1)
        .switchMap((range: IRange) => {
          return this.actionService.getAll({...query, start: range.start, end: range.end})
        });

    let sub = actionPlace$(query).subscribe((actions: IActionMap[]) => {
      let filteredAction = _.filter(actions, (action: IActionMap) => {
        return htAction().isValidMarker(action)
      });
      this.store.dispatch(new fromAction.AddFilterActionsMapAction(filteredAction));
    });

    this.subs.push(sub)
  }

  selectActionId(id) {
    super.selectActionId(id);
    this.broadcast.emit('scroll-top');
  }


  selectAction(select: boolean, action: IAction) {
    if(select) {
      this.broadcast.emit('hover-action', null);
      this.selectedActionId = action.id;
      this.store.dispatch(new fromUser.ClearUserAction());
      if(action.user) {
        this.mapService.preserveBounds();
        this.store.dispatch(new fromUser.SelectUserActionAction({actionId: action.id, userId: action.user.id}));
        // this.store.dispatch(new fromUi.LoadingMapUiAction(true))
      } else {
        this.router.navigate(['./', {id: action.id}], {relativeTo: this.route})
      }
    } else {
      this.unselectAction()
    }

  }

  unselectAction() {
    this.selectedActionId = null;
    this.mapService.setPreservedBounds();
    // this.store.dispatch(new fromAction.SetActionFilterHeatmap(() => true));
    this.store.dispatch(new fromUser.ClearUserAction());
    // let query = this.route.snapshot.queryParams;
    // let actionFilter = htAction().getMarkerFilter(query['status']);
    // this.store.dispatch(new fromAction.SetActionsMapFilterAction(actionFilter));
  }

  private getMapList() {

    let actionMarkerCb = (actionPage: Page<IActionMap>) => {
      let filteredActions = _.filter(actionPage.results, (action: IActionMap) => {
        return htAction().isValidMarker(action)
      });
      if(actionPage.previous) {
        this.store.dispatch(new fromAction.AddActiosMapAction(filteredActions));
      } else {
        this.store.dispatch(new fromAction.UpdateActionsMapAction(filteredActions))
      }
    };

    let actionHeatCb = (actionHeats: IActionHeatPage) => {
      if(actionHeats.previous) {
        this.store.dispatch(new fromAction.UpdateActionHeatmap(actionHeats.results))
      } else {
        this.store.dispatch(new fromAction.SetActionHeatmap(actionHeats.results))
      }
    };

    let actionMap$ = this.getListDateQuery().switchMap((query) => {
      this.isToday = IsRangeToday(query);
      if(this.isToday) {
        this.store.dispatch(new fromAction.ClearActionHeatmap());
        return this.actionService.getAll(query, actionMarkerCb)
      } else {
        this.store.dispatch(new fromAction.ClearActionHeatmap());
        this.store.dispatch(new fromAction.ClearActionsMapAction());
        return this.actionService.getHeatmap(query, actionHeatCb)
      }
    });

    let sub = actionMap$.subscribe((actions: IAction[]) => {
      this.store.dispatch(new fromUi.LoadingMapUiAction(false));
    });

    this.subs.push(sub)

  }

  hoverAction(actionId: string | null) {
    if(!config.isMobile) this.broadcast.emit('hover-action', actionId)
  }

  hoverGraph(item) {
    this.hoveredItemKey = item ? item.key : null;
  }

  private fillData() {
    let sub = this.getPageData().subscribe(data => {
      // this.items = data ? {...data, results: [data.results[0]]} : data;
      this.items = data;
    });

    let sub2 = this.store.select(fromRoot.getActionSummary).subscribe((data) => {
      this.actionsService.summary.setData(data)
    });

    // let sub2 = this.store.select(fromRoot.getActionSummary).filter(data => !!data).subscribe((data) => {
    //   this.summary = data;
    //   let total = 0;
    //   this.overview = _.map(this.actionSummary, (entity) => {
    //     let sum = _.reduce(entity.keys, (acc, key: string) => {
    //       return acc + data[key]
    //     }, 0);
    //     let value = entity.value + sum;
    //     total = total + sum;
    //     let selected = false;
    //     if(this.status) {
    //       let status = this.status.split(',');
    //       selected = _.reduce(entity.keys, (acc, key) => {
    //         return acc && status.indexOf(key) > -1
    //       }, true)
    //     };
    //     return {...entity, value, selected }
    //   });
    //   this.totalActions = total;
    //   // console.log("total", total);
    // })

    this.subs.push(sub, sub2)
  }

  private scrollSelected(id: string) {
    let selectedCard = this.actionCard.find((item: any) => {
      if(item.nativeElement.id == id) {
        setTimeout(() => {
          item.nativeElement.scrollIntoView({behavior: 'smooth'})

        },100)
      }
      return item.nativeElement.id == id
    });
    if(!selectedCard) {
      this.selectedActionId = null;

      this.store.dispatch(new fromUser.ClearUserAction());
      let query = this.route.snapshot.queryParams;
      let actionFilter = htAction().getMarkerFilter(query['status']);
      this.store.dispatch(new fromAction.SetActionsMapFilterAction(actionFilter));
      //clear selected map
    }
  }

  ngOnDestroy() {
    this.broadcast.emit('hover-action', null);
    this.store.dispatch(new fromUser.ClearUserAction());
    this.store.dispatch(new fromAction.ClearActionsMapAction());
    this.store.dispatch(new fromAction.ClearActionHeatmap());
    // this.store.dispatch(new fromAction.SetActionFilterHeatmap(() => true));
    this.mapService.clearPreserved();
    this.containerService.setEntity('actions');
    super.ngOnDestroy();
  }
}
