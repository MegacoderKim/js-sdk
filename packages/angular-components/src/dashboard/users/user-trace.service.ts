import {Injectable} from "@angular/core";
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {IPlaceHeat, IUserAnalytics, IUserPlaceline, IUserMap, IUser} from "ht-models";
import {BroadcastService} from "../core/broadcast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {config} from "../config";
import {SegmentsTrace} from "../trace/segment-trace";
import * as fromUser from "../actions/user";
import {InnerMapService} from "../map-container/map.service";
import {Observable} from "rxjs/Observable";
import {HtMapService} from "ht-angular";
import {StopsHeatmapTrace} from "ht-maps";
// import * as L from "leaflet";
import * as _ from "underscore";
import {htUser} from "ht-data";

@Injectable()
export class UserTraceService {
  segmentsTrace = new SegmentsTrace;
  usersCluster;
  userPlaces;
  placeline;
  // map: L.Map;
  constructor(
      private store: Store<fromRoot.State>,
      private broadcast: BroadcastService,
      private router: Router,
      private route: ActivatedRoute,
      private htMapService: HtMapService,
      private mapService: InnerMapService
  ) {
    this.usersCluster = this.htMapService.usersCluster;
    this.userPlaces = this.htMapService.usersHeatmap;
    this.placeline = this.htMapService.placeline;
    this.initListeners();
  }

  get map(): L.Map {
    return this.htMapService.map as L.Map;
  }

  setReplayHead(head) {
    if (head) {
      console.log(head, "replay head");
    } else {

    }

  }


  private initListeners() {
    this.segmentsTrace.timelineSegment.head$.filter(() => !!this.map).subscribe((head) => {
      this.setReplayHead(head)
    })
    // this.segmentsTrace.setSegmentPlayCallback((segmentId) => {
    //   this.broadcast.emit('replay-segment', segmentId);
    // });

    // this.broadcast.on('map-init').subscribe((data: L.Map) => {
    //   this.map = data;
    //   // this.map.addLayer(this.usersCluster.markerCluster);
    //   // this.map.addLayer(this.userPlaces.markerCluster);
    // });

    // this.broadcast.on('reset-map').debounceTime(50).subscribe((toFly: boolean) => {
    //   this.resetBounds(toFly)
    // });

    this.placeline.setCompoundData$(
      this.store.select(fromRoot.getCurrentUserData),
      {
        roots: ['placeline', 'actions'],
        highlighted$: this.store.select(fromRoot.getUserSelectedSegment).map((data => {
          return data ? data.id : null
        })),
        filter$: this.store.select(fromRoot.getUserSelectedPartialSegmentId),
        resetMap$: this.store.select(fromRoot.getUserSelectedPartialSegmentId)
      }
    );

    // this.store.select(fromRoot.getCurrentUserData).subscribe((user: IUserPlaceline) => {
    //   this.renderSegments(user);
    // });

    this.store.select(fromRoot.getReplayHeadState).subscribe((head) => {
      this.setReplayHead(head)
    });

    this.store.select(fromRoot.getUserSelectedSegment).scan((acc, segment) => {
      return {
        newSegment: segment,
        oldSegment: acc.newSegment
      }
    }, {oldSegment: null, newSegment: null}).subscribe(data => {
      if(data.oldSegment) {
        let segment = data.oldSegment;
        // this.segmentsTrace.unselectSegment(segment);
      }
      if(data.newSegment) {
        let segment = data.newSegment;
        // this.segmentsTrace.selectSegment(segment);
      }
    });

    // this.store.select(fromRoot.getUserSelectedEventId).subscribe((eventId: string) => {
    //   console.log(eventId, "selected event");
    // });

    this.usersCluster.setPageData$(
      this.store.select(fromRoot.getUserMapList)
        .pluck('validUsers')
        .map((data: any[]) => ({results: data, count: data ? data.length : 0, previous: "__"}))
    );

    this.usersCluster.onClick = (data) => {
      let userMap = data.data;
      this.mapService.preserveBounds();
      this.store.dispatch(new fromUser.SetUsersMapFilterAction((userMap: IUserAnalytics) => false));
      let base = config.isWidget ? '/widget' : '/';
      this.router.navigate([base, 'map', 'users', {id: userMap.id} ],
        {
          queryParamsHandling: 'preserve'
        })
    };

    this.store.select(fromRoot.getUserSelectedActionId).subscribe((actionId: string) => {
      // console.log("select action", actionId);
      // this.segmentsTrace.selectAction(actionId)
    });

    this.broadcast.on('hover-user').subscribe((user: IUserAnalytics) => {
      let userId = user ? user.id : null;
      this.usersCluster.setPopup(userId)
    })

    let places$ = this.store.select(fromRoot.getUserPlaceList).switchMap((places) => {
      if(config.isMobile) {
        return this.store.select(fromRoot.getUiShowMapMobile).filter(show => !!show).take(1).debounceTime(1000).map(() => places)
      } else {
        return Observable.of(places)
      }
    });

    this.userPlaces.setData$(
      this.store.select(fromRoot.getUserPlaceList),
      {
        hide$: this.store.select(fromRoot.getUserSelectedUserId)
      }
    );

  }

  //helpers

  private renderSegments(user: IUserPlaceline) {
    // console.log(user);
    // this.segmentsTrace.trace(user, this.map);
  }

  private resetBounds(fly: boolean = false) {
    // if(!config.toReset) return false;
    //
    // // let bounds = L.latLngBounds([]);
    // let bounds = this.htMapService.mapInstance.getItemsSetBounds([this.usersCluster,this.userPlaces]);
    // this.segmentsTrace.extendBounds(bounds);
    //
    // if(bounds.isValid() && this.map) {
    //   if(fly && !config.isMobile) {
    //     this.map.flyToBounds(bounds, {
    //       animate: true,
    //       duration: 1,
    //       easeLinearity: 0.58,
    //       padding: [60, 60],
    //     });
    //   } else {
    //     this.map.fitBounds(bounds, {
    //       animate: true,
    //       duration: 1.3,
    //       easeLinearity: 0.2,
    //       padding: [60, 60],
    //     });
    //   }
    //
    // } else if(this.map) {
    //   this.segmentsTrace.focusUserMarker(this.map);
    //   // this.map.setView(userPosition, 14)
    // }
  }

}


