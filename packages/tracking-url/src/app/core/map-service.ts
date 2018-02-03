import { Injectable, InjectionToken } from '@angular/core';
import { HtMapClass } from 'ht-maps';

export class MapService extends HtMapClass {

};

export var MAP_TYPE = new InjectionToken('app.mapType');
