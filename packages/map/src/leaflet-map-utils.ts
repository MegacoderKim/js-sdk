var polyUtil = require('polyline-encoded');

export function ExtendBounds (item = null, bounds: L.LatLngBounds = L.latLngBounds([])) {
  if(item && item.getElement()) bounds.extend(item.getLatLng());
  return bounds
};

export const ExtendBoundsWithPolyline = (polyline: L.Polyline = null, bounds: L.LatLngBounds = L.latLngBounds([])): L.LatLngBounds => {
  if(polyline && polyline.getElement() ) {
    bounds.extend(polyline.getBounds())
  }
  return bounds
};

export const SetStyle = (item, style) => {
  item.setStyle(style)
};

export const SetMap = (item, map: L.Map) => {
  if(item && !item.getElement()) item.addTo(map)
};

export const ClearItem = (item) => {
  item.remove();
  item.off()
};

export const GetLatlng = (lat: number = 0, lng: number = 0) => {
  return L.latLng(lat, lng)
};

export const SetEncodedPath = (polyline: L.Polyline, encodedPolyline: string) => {
  var path = polyUtil.decode(encodedPolyline);
  return polyline.setLatLngs(path)
};

export function HtUpdatePositionPopup(marker, position, infoContent: string, defaultOption: L.PopupOptions = {}) {
  marker.setLatLng(position);
  HtUpdatePopup(marker, infoContent, defaultOption)
}

export function HtUpdatePopup(marker, infoContent, defaultOption) {
  if(marker.getPopup()) {
    marker.setPopupContent(infoContent)
  } else {
    marker.bindPopup(infoContent, defaultOption);
  }
}

export function HtUpdatePositionTooltip(marker, position, infoContent: string, defaultOption: L.TooltipOptions = {}) {
  marker.setLatLng(position);
  HtUpdateTooltip(marker, infoContent, defaultOption)
}

export function HtUpdateTooltip(marker, infoContent, defaultOption) {
  if(marker.getTooltip()) {
    marker.setTooltipContent(infoContent)
  } else {
    marker.bindTooltip(infoContent, defaultOption);
  }
}

export const LeafletUtils = {
  setMap: SetMap,
  setStyle: SetStyle,
  clearItem: ClearItem,
  extendBounds: ExtendBounds,
  extendBoundsWithPolyline: ExtendBoundsWithPolyline,
  getLatlng: GetLatlng
}
