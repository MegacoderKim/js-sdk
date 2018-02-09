import { Injectable, InjectionToken } from '@angular/core';
import { HtMapClass, MapInstance } from 'ht-maps';
import {Subscription} from "rxjs/Subscription";
import {fromEventPattern} from "rxjs/observable/fromEventPattern";

export class MapService extends HtMapClass {
  checkDirtySub: Subscription;
  mapInstance: MapInstance;
  mapDirty: boolean = false;
  actionCompleted: boolean = false;
  constructor(...args: any[]) {
    super(...args);
  }
  resetCleanMap(action) {
    if(!this.mapDirty) {
      this.resetBounds()
    }
    if(!this.checkDirtySub) {
      this.checkDirtySub = this.mapInstance.onEvent$('click mousedown dragstart')
        .subscribe(data => {
          this.mapDirty = true;
      })
    }
  }

  resetMap() {
    if(!this.actionCompleted) this.mapDirty = false;
  }

  onComplete(action) {
    this.resetBounds();
    this.mapDirty = true;
    this.actionCompleted = true;
  }

};

export var MAP_TYPE = new InjectionToken('app.mapType');
