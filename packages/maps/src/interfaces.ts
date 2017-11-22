import {ISegment, ITimeAwarePoint, Partial} from "ht-models";
import {HtPosition} from "ht-data";

export interface IReplayHead {
  timePercent: number,
  currentTime: string,
  currentPosition: number[],
  bearing: number,
  currentSegment: IDecodedSegment, //this needs to be fixed
  segmentPercent: number
}

export interface IDecodedSegment extends  Partial<ISegment> {
  startPercent: number,
  endPercent: number,
  timeAwareArray?: ITimeAwarePoint[],
  start?: number,
  end?: number,
  bearing?: number,
  position?: number[],
  durationSeg: number,
  pstart?: string,
  pend?: string
}

export interface IReplayStats {
  start: string,
  end: string,
  duration: number,
  distance: number,
  timeAwarePolylineArray?: ITimeAwarePoint[],
  segments: IDecodedSegment[]
}

export interface IReplayPlayer {
  isPlaying: boolean,
  isStopped: boolean,
  speed: number
}

export type Entities<T> = {
  [id: string]: Entity<T>
}

export interface Entity<T> {
  item: any,
  isOld: boolean,
  data: T
}

export interface StyleObj {
  google: {
    default: object,
    [key: string]: object
  },
  leaflet: {
    default: object,
    [key: string]: object
  }
}

export type Constructor<T = object> = new (...args: any[]) => T;
