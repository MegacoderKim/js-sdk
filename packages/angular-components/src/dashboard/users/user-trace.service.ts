import {Injectable} from "@angular/core";
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {IPlaceHeat, IUserAnalytics, IUserPlaceline, IUserMap, IUser} from "ht-models";
import {BroadcastService} from "../core/broadcast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {config} from "../config";
import * as fromUser from "../actions/user";
import {InnerMapService} from "../map-container/map.service";
import {Observable} from "rxjs/Observable";
import {HtMapService, HtUsersService} from "ht-angular";
import {StopsHeatmapTrace, ReplayTrace} from "ht-maps";
import {ReplayMarkerTrace} from "../trace/replay-marker";
// import * as L from "leaflet";
import * as _ from "underscore";
import {htUser} from "ht-data";
import {of} from "rxjs/observable/of";

@Injectable()
export class UserTraceService {
  segmentsTrace = new ReplayTrace();
  usersCluster;
  replayMarker;
  // map: L.Map;
  constructor(
      private store: Store<fromRoot.State>,
      private broadcast: BroadcastService,
      private router: Router,
      private route: ActivatedRoute,
      private htMapService: HtMapService,
      private mapService: InnerMapService,
  ) {
    this.replayMarker = new ReplayMarkerTrace(this.htMapService.mapInstance);
    this.usersCluster = this.htMapService.usersCluster;
    this.initListeners();
  }

  get map(): L.Map {
    return this.htMapService.map as L.Map;
  }

  setReplayHead(head) {
    if (head) {
      this.replayMarker.setPopup('replay');
      this.replayMarker.trace({...head, id: "replay"})
    } else {
      this.replayMarker.setPopup();
      this.replayMarker.clear()
    }

  }


  private initListeners() {
    this.segmentsTrace.timelineSegment.head$.filter(() => !!this.map).subscribe((head) => {
      this.setReplayHead(head)
    });

    this.store.select(fromRoot.getReplayHeadState).subscribe((head) => {
      this.setReplayHead(head)
    });

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

    this.broadcast.on('hover-user').subscribe((user: IUserAnalytics) => {
      let userId = user ? user.id : null;
      this.usersCluster.setPopup(userId)
    });

  }

}


