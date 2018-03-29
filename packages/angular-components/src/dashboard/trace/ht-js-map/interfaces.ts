import {IPlaceline, ITimeAwarePoint, HtPosition} from "ht-models";

export interface MapUtils {
  setMap: (item: HtMapItem, map: HtMap) => void,
  setStyle: (item: HtMapItem, style) => void,
  clearItem: (item: HtMapItem) => void,
  extendBounds: (item?: HtMapItem, bounds?: HtBounds) => HtBounds
  extendBoundsWithPolyline: (item?: HtPolyline, bounds?: HtBounds) => HtBounds,
  getLatlng: (lat?: number, lng?: number) => HtLatLng,
  updatePosition: (marker: HtMarker, position: HtLatLng, content?: string, options?) => void,
  openTooltip: (item: HtMapItem, content?: string) => void
  closeTooltip: (item: HtMapItem) => void
  openPopup: (item: HtMapItem, content?: string) => void
  closePopup: (item: HtMapItem) => void
  bringToFront: (item: HtMapItem) => void,
  setFocus: (item: HtMapItem, map: HtMap) =>  void
}

export type HtMap = L.Map
export type HtBounds = L.LatLngBounds
export type HtPolyline = L.Polyline
export type HtLatLng = L.LatLng
export type HtMarker = any
export type HtMapItem = HtMarker | HtPolyline

export interface IReplayHead {
  timePercent: number,
  currentTime: string,
  currentPosition: HtPosition,
  bearing: number,
  currentSegment?: IDecodedSegment,
  segmentPercent?: number
}

export interface IDecodedSegment extends  Partial<IPlaceline> {
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
  placeline: IDecodedSegment[]
}

export interface IReplayPlayer {
  isPlaying: boolean,
  isStopped: boolean,
  speed: number
}
