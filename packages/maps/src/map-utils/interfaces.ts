import { HtPosition } from "ht-models";

export interface MapUtils {
  type: HtMapType;
  setMap: (item: HtMapItem, map: HtMap) => void;
  setStyle: (item: HtMapItem, style) => void;
  setCircleStyle: (item: HtMapItem, style) => void;
  setPolylineStyle: (polyline, style) => void;
  clearItem: (item: HtMapItem) => void;
  extendBounds: (
    item?: HtMapItem,
    bounds?: HtBounds,
    force?: boolean
  ) => HtBounds;
  extendBoundsWithPolyline: (item?: HtPolyline, bounds?: HtBounds) => HtBounds;
  getLatlng: (position: HtPosition) => HtLatLng;
  updatePosition: (
    marker: HtMarker,
    position: HtLatLng,
    content?: string,
    options?
  ) => void;
  openTooltip: (item: HtMapItem, content?: string) => void;
  closeTooltip: (item: HtMapItem) => void;
  openPopup: (item: HtMapItem | {}, map, content?: string, popup?) => void;
  openPopupPosition: (position: HtPosition, map, content, popup) => void;
  closePopup: (item: HtMapItem) => void;
  bringToFront: (item: HtMapItem) => void;
  setFocus: (item: HtMapItem, map: HtMap, config?: SetFocusConfig) => void;
  renderMap: (elem: Element, options: object) => HtMap;
  updateCirclePosition?: (
    item,
    position,
    info?: string,
    options?: object
  ) => any;
  getCircleMarker: () => any;
  getMarker: () => any;
  getMarkerCluster: (map: HtMap) => any;
  addMarkersToCluster: (cluster, markers: HtMarker[], map?) => any;
  removeClusterMarkers: (cluster) => any;
  removeClusterMarker: (cluster, marker) => any;
  getPopup: (options?) => any;
  getPolyline: () => any;
  setEncodedPath: (item, path: string) => void;
  setBounds: (map: HtMap, bounds: HtBounds) => void;
  isValidBounds: (bounds: HtBounds) => boolean;
  invalidateSize: (map) => void;
  onEvent: (item, event, cb) => void;
  setDivContent: (item, content: string, options?: object) => void;
  getDivMarker: () => any;
  setDivMarkerStyle: (marker, options: object) => any;
  setPathPositionTimeArray: (polyline, positionTimeArray) => any;
  getHeatmap: (options?) => any,
  updateHeatMapLatlng: (latlngs: HtPosition[], heatmap) => void;
}

export interface SetFocusConfig {
  zoom?: number;
  force?: boolean;
  center?: boolean;
}

export type HtMap = L.Map | google.maps.Map;
export type HtBounds = L.LatLngBounds | google.maps.LatLngBounds;
export type HtPolyline = L.Polyline | google.maps.Polyline;
export type HtLatLng = L.LatLng | google.maps.LatLng;
export type HtMarker =
  | L.CircleMarker
  | L.Circle
  | L.Marker
  | L.DivIcon
  | google.maps.Marker
  | google.maps.Circle;
export type HtMapItem = HtMarker | HtPolyline;
export type HtMapType = "google" | "leaflet";
