import { Injectable } from '@angular/core';
import {HtMapService} from "../ht/ht-map.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {MapInstance} from "ht-maps";

@Injectable()
export class TrackingMapService {
  checkDirtySub: Subscription;
  mapInstance: MapInstance;
  dirty$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  actionCompleted: boolean = false;
  defaultSetBoundsOptions = {
    paddingTopLeft: [15, 15],
    paddingBottomRight: [15, 70],
    duration: 2,
    animate: true,
    easeLinearity: 0.2,
    // easeLinearity: 0.58,
  };
  setBoundsOptions =  this.defaultSetBoundsOptions;
  constructor(public mapService: HtMapService) {
    this.mapInstance = this.mapService.mapInstance
  }

  resetCleanMap(action) {
    if(!this.dirty$.getValue()) {
      this.mapService.resetBounds()
    }
    if(!this.checkDirtySub) {
      this.checkDirtySub = this.mapInstance.onEvent$('click mousedown dragstart')
        .subscribe(data => {
          this.dirty$.next(true);
        })
    }
  }

  resetMap() {
    if(!this.actionCompleted) this.dirty$.next(false);
  }

  onComplete(action) {
    this.setBoundsOptions = {...this.setBoundsOptions, paddingBottomRight: [15, 120]};
    this.mapService.resetBounds(this.setBoundsOptions);
    this.dirty$.next(true);
    this.actionCompleted = true;
  }

}
