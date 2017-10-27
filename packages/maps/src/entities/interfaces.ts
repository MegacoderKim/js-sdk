import {HtMapType} from "../interfaces";
import {HtPosition} from "ht-data";
import {IUser, Partial, IUserAnalytics} from "ht-models";
import {HtBounds, HtMapUtils} from "../map-utils";

export interface RenderConfig {
  setMap: boolean,
  getItem: (data) => any,
  update:(data) => any,
  remove: (data) => any,
  removeItem: (data) => any,
  removeAll: (data) => any,
  getBounds: (bounds?) => any,
  setStyle: (item) => any,
  onClick(data, item): any,
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
  // config: RenderConfig,
  // dataClass:  DataObj<T>,
  trace: (data: any[]) => void,
  extendBounds: (bounds) => any
}

export interface DataObj<T> {
  data: T
  getPosition(): HtPosition | null,
  getInfoContent(): string
}

export interface Entity<T> extends DataObj<T>{
  item: any,
  isOld: boolean
}


