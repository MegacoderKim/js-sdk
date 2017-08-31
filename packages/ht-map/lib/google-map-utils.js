"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
function ExtendBounds(item, bounds) {
    if (item === void 0) { item = null; }
    bounds = bounds || new google.maps.LatLngBounds();
    if (item && item.getMap() && item.getPosition) {
        var p = item.getPosition();
        var l = { lat: p.lat(), lng: p.lng() };
        bounds.extend(l);
    }
    if (item && item.getMap() && item.getCenter) {
        bounds.extend(item.getCenter());
    }
    return bounds;
}
exports.ExtendBounds = ExtendBounds;
;
exports.ExtendBoundsWithPolyline = function (polyline, bounds) {
    if (polyline === void 0) { polyline = null; }
    if (bounds === void 0) { bounds = new google.maps.LatLngBounds(); }
    if (polyline && polyline.getMap()) {
        _.each(polyline.getPath().getArray(), function (p) {
            var l = { lat: p.lat(), lng: p.lng() };
            bounds.extend(l);
        });
    }
    return bounds;
};
exports.SetStyle = function (item, style) {
    item.setOptions(style);
};
exports.SetMap = function (item, map) {
    if ((item && !item.getMap()) || (item && !item.getMap))
        item.setMap(map);
};
exports.ClearItem = function (item) {
    item.setMap(null);
};
exports.GetLatlng = function (lat, lng) {
    if (lat === void 0) { lat = 0; }
    if (lng === void 0) { lng = 0; }
    return new google.maps.LatLng(lat, lng);
};
exports.setEncodedPath = function (polyline, encodedPolyline) {
    var path = google.maps.geometry.encoding.decodePath(encodedPolyline);
    return polyline.setPath(path);
};
function HtUpdatePositionPopup(marker, position, infoContent, defaultOption) {
    if (defaultOption === void 0) { defaultOption = {}; }
    marker.setPosition(position);
    HtUpdatePopup(marker, infoContent, defaultOption);
}
exports.HtUpdatePositionPopup = HtUpdatePositionPopup;
function HtUpdatePopup(marker, infoContent, defaultOption) {
    // if(marker.getPopup()) {
    //   marker.setPopupContent(infoContent)
    // } else {
    //   marker.bindPopup(infoContent, defaultOption);
    // }
}
exports.HtUpdatePopup = HtUpdatePopup;
function HtUpdatePositionTooltip(marker, position, infoContent, defaultOption) {
    if (infoContent === void 0) { infoContent = ""; }
    if (defaultOption === void 0) { defaultOption = {}; }
    marker.setPosition(position);
    // if(infoContent) HtUpdateTooltip(marker, infoContent, defaultOption)
}
exports.HtUpdatePositionTooltip = HtUpdatePositionTooltip;
function HtUpdateTooltip(marker, infoContent, defaultOption) {
    // if(marker.getTooltip()) {
    //   marker.setTooltipContent(infoContent)
    // } else {
    //   marker.bindTooltip(infoContent, defaultOption);
    // }
}
exports.HtUpdateTooltip = HtUpdateTooltip;
function openTooltip(item, content) {
    // if(content) item.setTooltipContent(content);
    // item.openTooltip()
}
function closeTooltip(item) {
    // item.closeTooltip()
}
function openPopup(item, content) {
    // if(content) item.setPopupContent(content);
    // item.openPopup()
}
function closePopup(item) {
    // item.closePopup()
}
function bringToFront(item) {
    // item.bringToFront()
}
function setFocus(item, map) {
    if (item && item.getMap()) {
        var center = getItemLatlng(item);
        map.setCenter(center);
    }
}
function getItemLatlng(item) {
    return item.getLatLng();
}
function renderMap(elem, options) {
    return new google.maps.Map(elem, options);
}
function updateCirclePosition(circle, position) {
    circle.setCenter(position);
}
function getCircleMarker() {
    return new google.maps.Marker();
}
function getPolyline() {
    return new google.maps.Polyline();
}
function setBounds(map, bounds, padding) {
    if (padding === void 0) { padding = 0; }
    var newBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
    map.fitBounds(newBounds);
}
function isValidBounds(bounds) {
    // console.log(bounds);
    // return !bounds.isEmpty()
    return !getBoundsFix(bounds).isEmpty();
}
function getBoundsFix(bounds) {
    return new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
}
exports.GoogleMapUtils = {
    setMap: exports.SetMap,
    setStyle: exports.SetStyle,
    clearItem: exports.ClearItem,
    extendBounds: ExtendBounds,
    extendBoundsWithPolyline: exports.ExtendBoundsWithPolyline,
    getLatlng: exports.GetLatlng,
    updatePosition: HtUpdatePositionTooltip,
    openTooltip: openTooltip,
    closeTooltip: closeTooltip,
    openPopup: openPopup,
    closePopup: closePopup,
    bringToFront: bringToFront,
    setFocus: setFocus,
    renderMap: renderMap,
    updateCirclePosition: updateCirclePosition,
    getCircleMarker: getCircleMarker,
    getPolyline: getPolyline,
    setEncodedPath: exports.setEncodedPath,
    setBounds: setBounds,
    isValidBounds: isValidBounds
};
