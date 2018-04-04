import {Component, OnInit, AfterViewInit, HostListener, AfterContentInit} from "@angular/core";
import {InnerMapService} from "./map.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers"
import * as fromUi from "../actions/ui"
import * as fromUser from "../actions/user"
import {Observable} from "rxjs/Observable";
import { Subscription} from "rxjs/Subscription";
import * as _ from "underscore";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BroadcastService} from "../core/broadcast.service";
import {config} from "../config";
import {FitToMapService} from "../container/user-filter/fit-to-map.service";
import {UserTraceService} from "../users/user-trace.service";
import {IUserPlaceline, IPlaceline} from "ht-models";
import {HtMapService} from "ht-angular";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.less']
})
export class MapContainerComponent implements OnInit, AfterViewInit, AfterContentInit {
  showMapMobile$: Observable<boolean>;
  showReplay$: Observable<boolean>;
  showNoSegment$: Observable<boolean>;
  subs: Subscription[] = [];
  showLoading$;
  showHeatmap$;
  hasSelectedUserPlaces$;
  mapReady: boolean = false;
  isMobile;
  hasPartialSegment$;
  invalidUsers$;
  userData$;
  disableSidebarScroll: boolean = false;
  mapOptions = {
    origin: [0, 0],
    zoom: 2,
    zoomControl: false,
    maxZoom: 18
  };
  constructor(
      public mapService: InnerMapService,
      private store: Store<fromRoot.State>,
      private router: Router,
      private route: ActivatedRoute,
      private broadcast: BroadcastService,
      public fitToMapService: FitToMapService,
      private userTraceService: UserTraceService,
      private htMapService: HtMapService
  ) {
    this.mapService.setMapShow();
    this.isMobile = config.isMobile;
    // let sub = this.router.events.subscribe(event => {
    //   // console.log("eve", event);
    //   if(event instanceof NavigationEnd) {
    //     // console.log("end");
    //     setTimeout(() => {
    //       this.mapService.invalidate()
    //     }, 300)
    //     // this.mapService.invalidate()
    //   }
    // });
    // this.subs.push(sub);
  }

  @HostListener('resize', ['$event'])
  onMapResize(e) {
    this.mapService.invalidate()
    // todo this.mapService.map.resize();
  }

  ngOnInit() {

    this.showMapMobile$ = this.store.select(fromRoot.getUiShowMapMobile).distinctUntilChanged().do((showMobileMap) => {
      if(config.isMobile && showMobileMap) {
        this.mapService.resetSize()
      }
    });

    this.userData$ = this.store.select(fromRoot.getUserData);
    this.showReplay$ = this.userTraceService.segmentsTrace.timelineSegment.getReplayStats()
      .map((stats) => {
        return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
      });

    if(this.route.snapshot.queryParams['view'] == 'map') {
      this.store.dispatch(new fromUi.UpdateMapMobileShowAction(true))
    }

    if(this.route.snapshot.queryParams['noscroll']) {
      this.disableSidebarScroll = true;
    }

    this.showNoSegment$ = this.store.select(fromRoot.getUserData).map((userData: IUserPlaceline) => {
      if(userData) {
        let tripStopSegment = _.filter(userData.placeline, (segment: IPlaceline) => {
          return segment.type == 'trip' || segment.type == 'stop'
        });
        return (userData.actions.length == 0 && tripStopSegment.length == 0)
      } else {
        return false;
      }
      // return userData ? (userData.actions.length == 0 && userData.placeline.length == 0) : false;
    });

    this.invalidUsers$ = this.store.select(fromRoot.getUserMapList)
      .pluck('invalidUsers')
      .map((users: any[]) => users.length)
      .distinctUntilChanged();

    this.hasPartialSegment$ = this.store.select(fromRoot.getUserSelectedPartialSegments).map((data) => !!data)
    // this.showReplay$ = this.store.select(fromRoot.getReplayStatsState).share().map(stats => {
    //   return stats && stats.timeAwarePolylineArray && stats.timeAwarePolylineArray.length > 1
    // }).distinctUntilChanged().do(() => {
    //   if(this.mapService.map) {
    //     setTimeout(() => {
    //       this.mapService.map.invalidateSize(true)
    //     }, 10)
    //   }
    // });

    this.showLoading$ = this.store.select(fromRoot.getUiLoadingMap).distinctUntilChanged();

    this.showHeatmap$ = this.store.select(fromRoot.getUserPlaceList).map(data => data.length).distinctUntilChanged();

    this.hasSelectedUserPlaces$ = this.store.select(fromRoot.getSelectedUserPlaces).map(entity => _.values(entity).length).distinctUntilChanged();
  }

  closeSelected() {
    this.broadcast.emit('close-heatmap')
  }

  closeSelectedSegment() {
    this.store.dispatch(new fromUser.ClearPartialSegmentAction())
  }

  handleTimelineMouseOver(id) {
    if (!id) {
      this.handleTimelineMouseOut();
    } else {
      this.store.dispatch(new fromUser.SelectSegmentAction(id));
    }
  }

  handleTimelineMouseOut() {
    this.store.dispatch(new fromUser.ClearSegmentAction());
  }
  ngAfterViewInit() {

    let origin = this.route.snapshot.queryParams['origin'];
    let zoom = this.route.snapshot.queryParams['zoom'];
    if(origin || zoom) {
      config.toReset = false;
      config.toPulse = false;
    }
    if(origin) origin = origin.split(',').map((s) => +s);
    this.htMapService.map$.pipe(take(1)).subscribe((map: L.Map) => {
      if(origin) map.panTo(origin);
      this.mapService.init(map, () => {
        this.mapReady = true;
      })
    })

  }

  ngAfterContentInit() {

  }

  toggleFitToMap() {
    this.fitToMapService.toggleFitToMap();
    this.mapService.toFitToMap = !this.mapService.toFitToMap;
    this.broadcast.emit('toggle-fit-map', this.mapService.map)
  }

  ngOnDestroy() {
    _.each(this.subs, sub => sub.unsubscribe());
    // GlobalMap.map = null //todo remove
  }

}
