import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {UserService} from "../users/user.service";
import {UserTraceService} from "../users/user-trace.service";
import {HtMapService, HtUsersService} from "ht-angular";
import {ContainerService} from "../container/container.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
// import * as fromRoot from "../reducers";
// import {Store} from "@ngrx/store";
// import {Subscription} from "rxjs/Subscription";
// import * as fromUser from "../actions/user";
import {DebuggerService} from "../core/debugger.service";
import {config} from "../config";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {getMergedParams} from "../../../../utils/src/url-helps";
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {filter, map, switchMap} from "rxjs/operators";
import * as fromUi from "../actions/ui"

@Component({
  selector: 'app-users-map',
  templateUrl: './users-map.component.html',
  styleUrls: ['./users-map.component.scss'],
  animations: [
    trigger('filter', [
      // state('hide', style({
      //   display: 'none'
      // })),
      transition(':enter', [
        style({transform: 'translateY(-300px)', opacity: 1}),
        animate('0.3s' + ' ease-out')
      ]),
      transition(':leave', [
        animate('0.3s' + ' ease-in', style({transform: 'translateY(-300px)', opacity: 1}))
      ])])
  ]
})
export class UsersMapComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  query: object;
  showReplay$;
  baseUrl = config.isWidget ? '/widget' : '/';
  isMobile = config.isMobile;
  view$: BehaviorSubject<string | null> = new BehaviorSubject<string|null>(this.isMobile ? 'list' : null);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store<fromRoot.State>,
    public userTraceService: UserTraceService,
    public htUsersService: HtUsersService,
    private mapService: HtMapService,
    private containerService: ContainerService,
    private debuggerService: DebuggerService
  ) { }

  @HostListener('dblclick', ['$event'])
  openDebugger(e) {
    console.log(e,  "debug");
    this.debuggerService.open()
  }

  selectUser() {

  }
  ngOnInit() {
    /**
     * subscribe local view to store showMap
     */
    this.store.select(fromRoot.getUiShowMapMobile).pipe(
      filter((_) => !!this.isMobile),
      map((isMap) => isMap ? 'map' : 'list')
    ).subscribe(this.view$);

    this.containerService.setEntity('users');
    this.containerService.setView('map');

    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats()
      .map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      });
    // this.setView();
    const view = this.route.snapshot.params['view'];
    if (view) {
      this.view$.next(view)
    }
    this.userId = this.route.snapshot.params['id'];
    this.query = this.userService.getQueryFromRoute(this.route.snapshot.params);

    this.userService.getQueryForRoute().subscribe((query) => {
      query = getMergedParams({...query, view});
      this.router.navigate([query], {relativeTo: this.route})
    });

    if (this.isMobile) {
      this.htUsersService.placeline.segmentResetId$.pipe(
        filter(segmentId => !!segmentId),
        map((segmentId) => {
          const view = this.view$.getValue();
          this.showMap();
          return view == 'list' ? 'map' : view
        })
      ).subscribe(this.view$)
    }

  };

  showMap(show: boolean = true) {
    this.store.dispatch(new fromUi.UpdateMapMobileShowAction(show))
  };

  showList() {
    this.store.dispatch(new fromUi.UpdateMapMobileShowAction(false))
  }

  setView() {
    const view = this.route.snapshot.params['view'];
    if (view) {
      this.view$.next(view)
    }
  }

  closeUser() {
    this.htUsersService.placeline.setId(null);
    this.htUsersService.list.setId(null);
    this.mapService.resetBounds();
    if (this.isMobile) {
      this.showList();
      this.view$.next('list')
    }
  }

  ngOnDestroy() {
    // if (this.sub) this.sub.unsubscribe();
  }

}
