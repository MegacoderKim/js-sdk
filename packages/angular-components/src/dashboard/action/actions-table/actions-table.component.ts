import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {DebuggerService} from "../../core/debugger.service";
import {ActionService} from "../action.service";
import {actionTableFormat} from "ht-data";
import {HtActionsService} from "ht-angular";
import {config} from "../../config";
import {ContainerService} from "../../container/container.service";
import {bottomAppear, fadeAppear, HtUsersService} from "ht-angular";
import {map} from "rxjs/operators";
import {UserTraceService} from "../../users/user-trace.service";

@Component({
  selector: 'app-actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.scss'],
  animations: [
    bottomAppear,
    fadeAppear
  ]
})
export class ActionsTableComponent implements OnInit, OnDestroy {
  tableFormat = [
    actionTableFormat.unique_id,
    actionTableFormat.type,
    actionTableFormat.user,
    actionTableFormat.status_dot,
    actionTableFormat.status,
    actionTableFormat.created_at,
    actionTableFormat.completed_at__eta,
    actionTableFormat.duration,
    actionTableFormat.distance
  ];
  loading$;
  query$;
  data$;
  isMobile = config.isMobile;
  baseUrl = config.isWidget ? '/widget' : '/';
  client;
  selectedActionId$;
  showReplay$
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private containerService: ContainerService,
    private actionsService: HtActionsService,
    private usersService: HtUsersService,
    public userTraceService: UserTraceService,
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
    this.containerService.setView('list');

    this.client = this.actionsService.list;
    this.loading$ = this.actionsService.list.loading$;
    this.query$ = this.actionsService.list.getApiQuery$();
    this.data$ = this.actionsService.list.data$;
    this.actionsService.list.setActive();
    this.selectedActionId$ = this.usersService.placeline.actionId$;

    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats().pipe(
      map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      })
    );

    this.setInitialQuery();
    this.innerActionsService.getQueryForRoute().subscribe((query) => {
      this.router.navigate([query], {relativeTo: this.route})
    })
  }

  setInitialQuery() {
    const actionId = this.route.snapshot.params['id'];
    const query = this.innerActionsService.getQueryFromRoute(this.route.snapshot.params);
    if (actionId) this.selectAction({id: actionId});
    if (query && Object.keys(query).length) this.setQuery(query);
  }

  setQuery(query) {
    this.actionsService.list.setQuery(query)
  }

  addQuery(query) {
    this.actionsService.list.addQuery(query)
  }

  setPage(page) {
    this.actionsService.list.addQuery({page});
  }

  selectAction(action) {
    this.usersService.placeline.setQuery({action_id: action.id})
  }

  closeUser() {
    this.usersService.placeline.setQuery({})
  }

  ngOnDestroy() {
    this.actionsService.listAll.clearData();
    this.actionsService.list.clearData();
    this.actionsService.listAll.setData(null)
  }

}
