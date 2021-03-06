import { IPlaceline, ITimeAwarePoint, Partial } from "ht-models";
import { HtPosition, IDecodedSegment } from "ht-models";
import {HtMapType} from "ht-map-wrapper";
import {MapInstance} from "./map-utils/map-instance";

export interface IReplayHead {
  timePercent: number;
  currentTime: string;
  currentPosition: HtPosition;
  bearing: number;
  currentSegment: IDecodedSegment; //this needs to be fixed
  segmentPercent: number;
}

export interface IReplayStats {
  start: string;
  end: string;
  duration: number;
  distance: number;
  timeAwarePolylineArray?: ITimeAwarePoint[];
  placeline: IDecodedSegment[];
}

export interface IReplayPlayer {
  isPlaying: boolean;
  isStopped: boolean;
  speed: number;
}

export type Entities<T = any> = {
  [id: string]: Entity<T>;
};

export interface Entity<T = any> {
  item: any;
  isOld: boolean;
  data: T;
}

export interface StyleFunct {
  get: (type: HtMapType, data?: any) => {
    default: object;
    [key: string]: object;
  }
}

export interface StyleObj {
  google: {
    default: object;
    [key: string]: object;
  };
  leaflet: {
    default: object;
    [key: string]: object;
  };
}

export type Constructor<T = object> = new (...args: any[]) => T;

export interface MarkerDataConfig<T> {
  getPosition(data: T): HtPosition;
  getInfoContent?(data: T): string;
  mapInstance?: MapInstance;
}

export interface DivMarkerDataConfig<T> extends MarkerDataConfig<T> {
  // getPosition?(data: T): HtPosition,
  // getInfoContent?(data: T): string,
  getDivContent(data: T): string;
}

export interface PolylineDataConfig<T> {
  getEncodedPath?(data: T): string;
  getEncodedPositionTime?(data: any): string;
  mapInstance?: MapInstance;
}


export interface AllDataConfig<T>
  extends Partial<PolylineDataConfig<T>>,
    Partial<DivMarkerDataConfig<T>>,
    Partial<MarkerDataConfig<T>> {}
export type DataConfig<T> =
  | MarkerDataConfig<T>
  | DivMarkerDataConfig<any>
  | PolylineDataConfig<any>;

export interface EventConfig {
  onClick?(mapItems, entity: Entity<any>): any;
  onMouseEnter?(entity: Entity<any>): any;
  onMouseLeave?(entity: Entity<any>): any;
}
