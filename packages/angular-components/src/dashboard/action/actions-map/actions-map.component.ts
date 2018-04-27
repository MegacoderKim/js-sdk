import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {HtActionsService, HtMapService, HtUsersService, summaryAnim} from "ht-angular";
import {config} from "../../config";
import {ContainerService} from "../../container/container.service";
import {DebuggerService} from "../../core/debugger.service";
import {UserTraceService} from "../../users/user-trace.service";
import {filter, map, share, take} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {IAction, Page} from "ht-models";
import {ActionService} from "../action.service";

@Component({
  selector: 'app-actions-map',
  templateUrl: './actions-map.component.html',
  styleUrls: ['./actions-map.component.scss'],
  animations: [
    summaryAnim
  ]
})
export class ActionsMapComponent implements OnInit, OnDestroy {
  loading$;
  query$;
  data$;
  baseUrl = config.isWidget ? '/widget' : '/';
  isMobile = config.isMobile;
  client;
  selectedActionId$;
  showReplay$;
  userPlaceline$;
  constructor(
    private containerService: ContainerService,
    private usersService: HtUsersService,
    public userTraceService: UserTraceService,
    private mapService: HtMapService,
    private route: ActivatedRoute,
    private router: Router,
    private actionsService: HtActionsService,
    private innerActionsService: ActionService,
    private debuggerService: DebuggerService
  ) { }


  @HostListener('dblclick', ['$event'])
  openDebugger(e) {
    console.log(e,  "debug");
    this.debuggerService.open()
  }

  ngOnInit() {
    this.containerService.setEntity('actions');
    this.containerService.setView('map');

    this.selectedActionId$ = this.usersService.placeline.actionId$.pipe(
      // share()
    );

    this.client = this.actionsService.list;
    this.loading$ = this.actionsService.list.loading$;
    this.query$ = this.actionsService.list.getApiQuery$();
    this.data$ = this.actionsService.list.data$;
    this.actionsService.list.setActive();
    this.actionsService.listAll.setActive();

    this.userPlaceline$ = this.usersService.placeline.data$.pipe(
      // share()
    );

    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats().pipe(
      map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      })
    );

    this.setInitialQuery();
    this.innerActionsService.getQueryForRoute().subscribe((query) => {
      this.router.navigate([query], {relativeTo: this.route})
    });
  };


  setInitialQuery() {
    const actionId = this.route.snapshot.params['id'];
    const query = this.innerActionsService.getQueryFromRoute(this.route.snapshot.params);
    if (actionId) this.selectAction({id: actionId});
    if (query && Object.keys(query).length) this.setQuery(query);
  }

  fetchPage(page) {
    this.actionsService.list.addQuery({page})
  }

  setQuery(query) {
    this.actionsService.list.setQuery(query)
  }


  selectAction(action) {
    this.usersService.placeline.setQuery({action_id: action.id})
  }

  closeUser() {
    this.usersService.placeline.setQuery({});
    this.usersService.placeline.setData(null);
    this.mapService.resetBounds();
  }

  ngOnDestroy() {
    this.actionsService.listAll.clearData();
    this.actionsService.list.clearData();
    this.actionsService.listAll.setData(null)
  }

}
