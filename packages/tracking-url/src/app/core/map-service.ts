import { Injectable, InjectionToken } from '@angular/core';
import { HtMapClass, MapInstance } from 'ht-maps';
import {Subscription} from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class MapService extends HtMapClass {
  checkDirtySub: Subscription;
  mapInstance: MapInstance;
  dirty$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  actionCompleted: boolean = false;
  constructor(...args: any[]) {
    super(...args);
  }
  resetCleanMap(action) {
    if(!this.dirty$.getValue()) {
      this.resetBounds()
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
    this.resetBounds();
    this.dirty$.next(true);
    this.actionCompleted = true;
  }

};

export var MAP_TYPE = new InjectionToken('app.mapType');
