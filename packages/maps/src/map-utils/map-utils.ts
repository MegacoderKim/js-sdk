// import {HtPosition} from "ht-data";
// //currently unused
// export abstract class HtMapUtils {
//   abstract
//   abstract setMap: (item: HtMapItem, map: HtMap) => void;
//   abstract setStyle: (item: HtMapItem, style) => void;
//   abstract clearItem: (item: HtMapItem) => void;
//   abstract extendBounds: (item?: HtMapItem, bounds?: HtBounds, force?: boolean) => HtBounds;
//   abstract extendBoundsWithPolyline: (item?: HtPolyline, bounds?: HtBounds) => HtBounds;
//   abstract getLatlng: (position: HtPosition) => HtLatLng;
//   abstract updatePosition: (marker: HtMarker, position: HtLatLng, content?: string, options?) => void;
//   abstract openTooltip: (item: HtMapItem, content?: string) => void;
//   abstract closeTooltip: (item: HtMapItem) => void;
//   abstract openPopup: (item: HtMapItem | {}, map, content?: string, popup?) => void;
//   abstract openPopupPosition: (HtPosition, map, content, popup) => void;
//   abstract closePopup: (item: HtMapItem) => void;
//   abstract bringToFront: (item: HtMapItem) => void;
//   abstract setFocus: (item: HtMapItem, map: HtMap, zoom?, force?: boolean) =>  void;
//   abstract renderMap: (elem: Element, options: object) => HtMap;
//   abstract updateCirclePosition?: (item, position, info?: string, options?: object) => any;
//   abstract getCircleMarker: () => any;
//   abstract getMarker: () => any;
//   abstract getMarkerCluster: (map: HtMap) =>  any;
//   abstract addMarkersToCluster: (cluster, markers: HtMarker[], map?) => any;
//   abstract removeClusterMarkers: (cluster) =>  any;
//   abstract removeClusterMarker: (cluster, marker) => any;
//   abstract getPopup: (options?) => any;
//   abstract getPolyline: () => any;
//   abstract setEncodedPath: (item, path: string) => void;
//   abstract setBounds: (map: HtMap, bounds: HtBounds, options?: any) => void;
//   abstract isValidBounds: (bounds: HtBounds) => boolean;
//   abstract invalidateSize: (map) => void;
//   abstract onEvent: (item, event, cb) => void
// }
//
// export type HtMap = L.Map | google.maps.Map
// export type HtBounds = L.LatLngBounds | google.maps.LatLngBounds
// export type HtPolyline = L.Polyline | google.maps.Polyline
// export type HtLatLng = L.LatLng | google.maps.LatLng
// export type HtMarker = L.CircleMarker | L.Circle | L.Marker | L.DivIcon | google.maps.Marker | google.maps.Circle
// export type HtMapItem = HtMarker | HtPolyline
// export type HtMapType = 'google' | 'leaflet'
