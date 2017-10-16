import {ISegment, ITimeAwarePoint, Partial} from "ht-models";
import {HtPosition} from "ht-js-data";

export interface MapUtils {
  setMap: (item: HtMapItem, map: HtMap) => void,
  setStyle: (item: HtMapItem, style) => void,
  clearItem: (item: HtMapItem) => void,
  extendBounds: (item?: HtMapItem, bounds?: HtBounds, force?: boolean) => HtBounds
  extendBoundsWithPolyline: (item?: HtPolyline, bounds?: HtBounds) => HtBounds,
  getLatlng: (position: HtPosition) => HtLatLng,
  updatePosition: (marker: HtMarker, position: HtLatLng, content?: string, options?) => void,
  openTooltip: (item: HtMapItem, content?: string) => void
  closeTooltip: (item: HtMapItem) => void
  openPopup: (item: HtMapItem | {}, map, content?: string, popup?) => void
  openPopupPosition: (HtPosition, map, content, popup) => void
  closePopup: (item: HtMapItem) => void
  bringToFront: (item: HtMapItem) => void,
  setFocus: (item: HtMapItem, map: HtMap, config?: SetFocusConfig) =>  void,
  renderMap: (elem: Element, options: object) => HtMap,
  updateCirclePosition?: (item, position, info?: string, options?: object) => any,
  getCircleMarker: () => any,
  getMarker: () => any,
  getMarkerCluster: (map: HtMap) =>  any,
  addMarkersToCluster: (cluster, markers: HtMarker[], map?) => any,
  removeClusterMarkers: (cluster) =>  any,
  removeClusterMarker: (cluster, marker) => any,
  getPopup: (options?) => any,
  getPolyline: () => any,
  setEncodedPath: (item, path: string) => void,
  setBounds: (map: HtMap, bounds: HtBounds, options?: any) => void
  isValidBounds: (bounds: HtBounds) => boolean,
  invalidateSize: (map) => void,
  onEvent: (item, event, cb) => void
}

export interface SetFocusConfig {
  zoom?: number,
  force?: boolean,
  center?: boolean
}

export type HtMap = L.Map | google.maps.Map
export type HtBounds = L.LatLngBounds | google.maps.LatLngBounds
export type HtPolyline = L.Polyline | google.maps.Polyline
export type HtLatLng = L.LatLng | google.maps.LatLng
export type HtMarker = L.CircleMarker | L.Circle | L.Marker | L.DivIcon | google.maps.Marker | google.maps.Circle
export type HtMapItem = HtMarker | HtPolyline
export type HtMapType = 'google' | 'leaflet'

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

export interface HtMapItemsOptions<T> {
  getInfoContent?: (data: T) => string,
  getItem?: (data) => T | any,
  getPosition?: (data) => HtPosition
}

export interface HtMapItemOptions<T> {

}
