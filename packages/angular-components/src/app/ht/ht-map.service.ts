import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HtMapClass, HtMapType} from "ht-maps";

export class HtMapService extends HtMapClass {
  // constructor(@Inject(MAP_TYPE) mapType: HtMapType) {
  //   super(mapType)
  // }
  // constructor() { }

}

export var MAP_TYPE = new InjectionToken('app.mapType');

