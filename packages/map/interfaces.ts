export interface MapUtils {
  setMap: (item, map) => void,
  setStyle: (item, style) => void,
  clearItem: (item) => void,
  extendBounds: (item?, bounds?: HtBounds) => HtBounds
  extendBoundsWithPolyline: (item?: HtPolyline, bounds?: HtBounds) => HtBounds,
  getLatlng: (lat: number, lng: number) => HtLatLng
}

export type HtMap = L.Map | google.maps.Map
export type HtBounds = L.LatLngBounds | google.maps.LatLngBounds
export type HtPolyline = L.Polyline | google.maps.Polyline
export type HtLatLng = L.LatLng | google.maps.LatLng