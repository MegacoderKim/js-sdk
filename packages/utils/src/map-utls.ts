var polyUtil = require('polyline-encoded');

export function ExtendBounds (item, bounds: L.LatLngBounds) {
    if(item && item.getElement()) bounds.extend(item.getLatLng())
};

export const ExtendBoundsWithPolyline = (polyline: L.Polyline, bounds: L.LatLngBounds): L.LatLngBounds => {
    if(polyline ) {
        bounds.extend(polyline.getBounds())
    }
    return bounds
};

export const SetMap = (item, map: L.Map) => {
    if(item && !item.getElement()) item.addTo(map)
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
