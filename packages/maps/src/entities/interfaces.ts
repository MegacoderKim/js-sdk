import {HtMapType} from "../interfaces";
import {HtPosition} from "ht-data";
import {IUser, Partial, IUserAnalytics} from "ht-models";
import {HtBounds, HtMapUtils} from "../map-utils";

export interface EventConfig {
  onClick?(mapItems: MapEntities<any>, entity: Entity<any>): any,
  onMouseEnter?(mapItems: MapEntities<any>, entity: Entity<any>): any,
  onMouseLeave?(mapItems: MapEntities<any>, entity: Entity<any>): any
}

export interface RenderConfig extends EventConfig, AllDataConfig<any>{
  setMap: boolean,
  getItem: (data) => any,
  update:(data) => any,
  remove: (data) => any,
  removeItem: (data) => any,
  removeAll: (data) => any,
  getBounds: (bounds?) => any,
  setStyle: (item) => any,
  traceEffect?(): any
  // onMousein(data): any,
  // onMouseOut(data): any
}

export type Entities<T> = {
  [id: string]: Entity<T>
}
export interface MapEntities<T> extends RenderConfig {
  name?: string
  entities: Entities<T>,
  map?: any,
  styles(mapType: HtMapType): object,
  stylesObj: object,
  stylesType: string;
  cluster?: any,
  popup?: any,
  // config: RenderConfig,
  // dataClass:  DataObj<T>,
  trace: (data: any[]) => void,
  extendBounds: (bounds) => any
}

export interface Entity<T> {
  item: any,
  isOld: boolean,
  data: T
}

export interface MarkerDataConfig<T> {
  getPosition(data: T): HtPosition,
  getInfoContent?(data: T): string,
}

export interface DivMarkerDataConfig<T> extends MarkerDataConfig<T>{
  // getPosition?(data: T): HtPosition,
  // getInfoContent?(data: T): string,
  getDivContent(data: T): string
}

export interface PolylineDataConfig<T> {
  getEncodedPath(data: T): string
}

export interface AllDataConfig<T> extends Partial<PolylineDataConfig<T>>, Partial<DivMarkerDataConfig<T>>, Partial<MarkerDataConfig<T>> {

}
export type DataConfig<T> = MarkerDataConfig<T>
  | DivMarkerDataConfig<any>
  | PolylineDataConfig<any>


