import { Injectable } from '@angular/core';
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {BroadcastService} from "../core/broadcast.service";
import {IActionHeat, IActionMap} from "ht-models";
import {ActionsHeatmapTrace} from "ht-maps";
import {Router} from "@angular/router";
import {config} from "../config";
import {HtMapService} from "ht-angular";
import {filter} from "rxjs/operators";
import * as _ from "underscore";

@Injectable()
export class ActionTraceService {
  actionsCluster;
  actionsHeat;
  constructor(
      private store: Store<fromRoot.State>,
      private broadcast: BroadcastService,
      private router: Router,
      private htMapService: HtMapService
  ) {
    this.initListeners();
    this.initCluster();
    this.initHeatmap();
  }

  private initCluster() {
    this.actionsCluster = this.htMapService.actionsCluster;
    this.actionsCluster.onClick = (data) => {
      this.selectAction(data.data)
    };
    this.actionsCluster.setPageData$(
      this.store.select(fromRoot.getActionMapList)
        .map((data: any[]) => ({results: data, count: data ? data.length : 0, previous: "__"})),
      {
        hide$: this.store.select(fromRoot.getUserSelectedUserId)
      }
    )
  }

  private initHeatmap() {
    this.actionsHeat = this.htMapService.actionsHeatmap;
    this.actionsHeat.setData$(this.store.select(fromRoot.getActionFilteredHeat), {
      hide$: this.store.select(fromRoot.getUserSelectedUserId)
    })
  };

  get map(): L.Map {
    return this.htMapService.map as L.Map;
  }

  private initListeners() {
    // this.broadcast.on('map-init').subscribe((data: L.Map) => {
    //   this.map = data;
    //   // this.map.addLayer(this.actionsCluster.markerCluster);
    // });


    this.broadcast.on('reset-map').debounceTime(200).subscribe(() => {
      this.resetBounds()
    });

    this.broadcast.on('hover-action').subscribe((actionId: string | null) => {
      this.actionsCluster.setPopup(actionId)
    });

  }

  selectAction(action) {
    this.router.navigate(['/actions', {id: action.id}])
  }


  private resetBounds() {
    // if(!config.toReset) return false;
    // let bounds = this.htMapService.mapInstance.getItemsSetBounds([this.actionsCluster,this.actionsHeat]);
    // // this.actionsHeat.extendBounds(bounds);
    // if(bounds.isValid()) this.map.fitBounds(bounds, {
    //   animate: true,
    //   duration: 1.3,
    //   easeLinearity: 0.2,
    //   paddingTopLeft: [15, 15],
    //   paddingBottomRight: [15, 15]
    // });
  };
}
