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
  bringToFront: (item: HtMapItem) => void
}

export type HtMap = L.Map | google.maps.Map
export type HtBounds = L.LatLngBounds | google.maps.LatLngBounds
export type HtPolyline = L.Polyline | google.maps.Polyline
export type HtLatLng = L.LatLng | google.maps.LatLng
export type HtMarker = any
export type HtMapItem = HtMarker | HtPolyline