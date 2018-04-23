import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as fromRoot from "../reducers";
import {Store} from "@ngrx/store";
import {UpdateMapShowAction, UpdateMapMobileShowAction} from "../actions/ui";
import {BroadcastService} from "../core/broadcast.service";
import {UserTraceService} from "../users/user-trace.service";
import {ActionTraceService} from "../action/action-trace.service";
import {ActivatedRoute} from "@angular/router";
import {config} from "../config";
import {HtActionsService, HtMapService, HtUsersService} from "ht-angular";
import {debounceTime} from "rxjs/operators";
// import {control, Control, DomUtil, Map} from "leaflet";
// import * as L from "leaflet";

@Injectable()
export class InnerMapService {
  toShowFitToMap: boolean = false;
  toFitToMap: boolean = true;
  fitToMapControl: L.Control | null;
  preservedBounds: L.LatLngBounds | null = null;
  showMapSwitch: boolean = false;
  constructor(
      private store: Store<fromRoot.State>,
      private broadcast: BroadcastService,
      private route: ActivatedRoute,
      private actionTrace: ActionTraceService,
      private htMapService: HtMapService,
      private htUsersService: HtUsersService,
      private htActionsService: HtActionsService
  ) {
    this.setMapStyle();
    this.broadcast.on('reset-map').pipe(debounceTime(50)).subscribe((toFly: boolean) => {
      if (this.map) {
        this.htMapService.resetBounds()
      }
    });
    this.setMapEffects()
  };

  setMapEffects() {
    //placeline
    this.htMapService.placeline.setCompoundData$(
      this.htUsersService.placeline.data$,
      {
        roots: ['placeline', 'actions'],
        highlighted$: this.htUsersService.placeline.segmentSelectedId$,
        filter$: this.htUsersService.placeline.segmentResetId$,
        resetMap$: this.htUsersService.placeline.segmentResetId$
      }
    );
    //users cluseter
    this.htMapService.usersCluster.setPageData$(
      this.htUsersService.listAll.data$,
      {
        hide$: this.htUsersService.placeline.id$
      }
    );
    //users places
    this.htMapService.usersHeatmap.setData$(this.htUsersService.heatmap.data$, {
      hide$: this.htUsersService.placeline.id$
    });
    //actions cluster
    this.htMapService.actionsCluster.setPageData$(
      this.htActionsService.listAll.data$,
      {
        hide$: this.htUsersService.placeline.data$
      }
    )
    //actions heatmap
    this.htMapService.actionsHeatmap.setPageData$(this.htActionsService.heatmap.data$, {
      hide$: this.store.select(fromRoot.getUserSelectedUserId)
    })
  }

  setMapStyle() {
    let add = window.devicePixelRatio > 1 ? '@2x' : '';
    const key = environment.mapKey;
    const tileUrl = environment.tileUrl;
    if (tileUrl) {
      const url = `${tileUrl}${add}.png?key=${key}`;
      this.htMapService.mapInstance.mapUtils.setDefaultMapOptions({tileLayerUrl: url, tileLayerOptions: {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }});
    }
  }

  get map(): L.Map {
    return this.htMapService.map as L.Map;
  }

  init(map, cb?) {
    map.on('tangramloaded', () => {
      if(cb) cb()
    });
    this.constructMap(map);
    // if(cb) cb()
    // this.map.whenReady(() => {
    //
    // })
    // this.map.id = new Date().getTime();
  }

  setMapShow(toShow: boolean = true) {
    this.store.dispatch(new UpdateMapShowAction(toShow))
  }

  setMapMobileShow(toShow: boolean = true) {
    this.store.dispatch(new UpdateMapMobileShowAction(toShow))
  }

  constructMap(map) {
    if(config.isStaff) window['map'] = map;
    if(config.toReset) {
      // this.setResetMapControl(map);
      this.htMapService.mapInstance.mapUtils.setZoomControl(map, {
        position: 'bottomright'
      })
    }


    // L.tileLayer(environment.mapUrl, {
    //   // detectRetina: true
    // }).addTo(this.map);

    this.broadcast.emit('map-init', map)

  }

  private setControl(map: L.Map, customControl) {
    let control = new customControl();
    map.addControl(control);
    return control;
  }

  private setResetMapControl(map: L.Map) {
    let customControl = this.getRestMapControl();
    this.setControl(map, customControl)
  }

  setFitToMapControl(map: L.Map) {
    if(!this.fitToMapControl) {
      let control = this.getFitToMapControl();
      this.fitToMapControl = this.setControl(map, control)
    }

  }

  removeFitToMapControl() {
    this.fitToMapControl.remove();
    this.fitToMapControl = null;
  }

  private getRestMapControl() {
    // return Control.extend({
    //   onAdd: (map) => {
    //     var img = DomUtil.create('div', 'leaflet-control leaflet-bar');
    //     let size = '27px';
    //     img.innerHTML = `<div class="flex-row clickable"><span class="auto">FIT IN VIEW</span></div>`;
    //     // img.innerHTML = `<i style="font-size: 1.3em" class="fa fa-arrows-alt auto"></i>`;
    //     // img.style.width = size;
    //     // img.style.height = size;
    //     img.style.display = 'flex';
    //     img.style.padding = '2px 6px';
    //     img.style.backgroundColor = '#fff';
    //     img.onclick = () => {
    //       this.broadcast.emit('reset-map')
    //     };
    //     return img;
    //   },
    //
    //   onRemove: function(map) {
    //     // Nothing to do here
    //   },
    //
    //   options: {
    //     position: 'topright'
    //   }
    // });
  }

  invalidate() {
    setTimeout(() => {
      if(this.map && this.map.getContainer().offsetWidth) {
        this.map.invalidateSize();
      }
    }, 600)
  }

  resetSize() {
    setTimeout(() => {
      if(this.map && this.map.getContainer().offsetWidth) {
        this.map.invalidateSize();
        this.broadcast.emit('reset-map')
      }

    }, 400)
  }

  getBoundingBox(): string | null {
    if(!this.map) return null;
    let bounds = this.map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    return `${northEast.lng},${northEast.lat},${southWest.lng},${southWest.lat}`
  }

  getToFitToBounds(): boolean {
    return this.toShowFitToMap && this.toFitToMap
  }

  private getFitToMapControl() {

  }

  clearPreserved() {
    this.preservedBounds = null;
  }

  setPreservedBounds() {
    if(this.preservedBounds) {
      let map = this.map as L.Map;
      map.fitBounds(this.preservedBounds);
      this.clearPreserved()
    }
  }

  preserveBounds() {
    if(!this.preservedBounds) this.preservedBounds = this.map.getBounds() as L.LatLngBounds;
  }
}
