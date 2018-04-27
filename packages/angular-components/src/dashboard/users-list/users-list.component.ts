import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {DebuggerService} from "../core/debugger.service";
import {UserService} from "../users/user.service";
import {UserTraceService} from "../users/user-trace.service";
import {HtMapService, HtUsersService} from "ht-angular";
import {Observable} from "rxjs/Observable";
import {IUserAnalytics, Page} from "ht-models";
import {userTableFormat} from "ht-data";
import {config} from "../config";
import {ContainerService} from "../container/container.service";
import {bottomAppear, fadeAppear} from "ht-angular";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less'],
  animations: [
    bottomAppear,
    fadeAppear
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {
  data$: Observable<Page<IUserAnalytics>>;
  loading$: Observable<boolean | string>;
  userId: string | null = null;
  query;
  query$: Observable<object>;
  showReplay$;
  selectedUserId$: Observable<string | null>;
  baseUrl = config.isWidget ? '/widget' : '/';
  isMobile = config.isMobile;
  tableFormat = [
    userTableFormat.photo,
    userTableFormat.name,
    userTableFormat.status,
    userTableFormat.last_heartbeat_at,
    userTableFormat.total_distance,
    userTableFormat.total_duration,
    userTableFormat.location_disabled_duration,
    userTableFormat.network_offline_duration,
    userTableFormat.num_actions,
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public userTraceService: UserTraceService,
    public htUsersService: HtUsersService,
    private containerService: ContainerService,
    private mapService: HtMapService,
    private debuggerService: DebuggerService
  ) { }

  @HostListener('dblclick', ['$event'])
  openDebugger(e) {
    console.log(e,  "debug");
    this.debuggerService.open()
  }

  ngOnInit() {
    this.containerService.setEntity('users');
    this.containerService.setView('list');

    this.htUsersService.list.setActive();
    this.data$ = this.htUsersService.list.data$;
    this.loading$ = this.htUsersService.list.loading$;
    this.query$ = this.htUsersService.list.getApiQuery$();
    this.selectedUserId$ = this.htUsersService.placeline.id$;

    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats().pipe(
      map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      })
    );

    this.setInitialQuery();
    this.userService.getQueryForRoute().subscribe((query) => {
      this.router.navigate([query], {relativeTo: this.route})
    })

  };

  setInitialQuery() {
    const userId = this.route.snapshot.params['id'];
    const query = this.userService.getQueryFromRoute(this.route.snapshot.params);
    if (userId) this.selectUser({id: userId});
    if (query && Object.keys(query).length) this.setQuery(query);
  }

  selectUser(user) {
    this.htUsersService.placeline.setId(user.id)
  }

  setPage(page) {
    this.htUsersService.list.addQuery({page});
    // this.htUsersService.list.loading$.pipe(
    //   filter((loading) => !loading),
    //   take(1)
    // ).subscribe(
    //
    // )
  }

  setQuery(query) {
    this.htUsersService.list.setQuery(query)
  }

  closeUser() {
    this.htUsersService.placeline.setId(null);
  };

  ngOnDestroy() {
    this.htUsersService.list.clearData();
    this.htUsersService.placeline.clearData();
  }
}
