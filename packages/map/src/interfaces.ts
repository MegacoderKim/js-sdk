import {ISegment, ITimeAwarePoint} from "ht-models";

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

export type HtMap = L.Map | google.maps.Map
export type HtBounds = L.LatLngBounds | google.maps.LatLngBounds
export type HtPolyline = L.Polyline | google.maps.Polyline
export type HtLatLng = L.LatLng | google.maps.LatLng
export type HtMarker = any
export type HtMapItem = HtMarker | HtPolyline

export interface IReplayHead {
  timePercent: number,
  currentTime: string,
  currentPosition: number[],
  bearing: number,
  currentSegment: IDecodedSegment,
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