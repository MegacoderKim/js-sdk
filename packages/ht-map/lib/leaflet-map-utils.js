"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var polyUtil = require('polyline-encoded');
function ExtendBounds(item, bounds) {
    if (item === void 0) { item = null; }
    if (bounds === void 0) { bounds = L.latLngBounds([]); }
    if (item && item.getElement())
        bounds.extend(item.getLatLng());
    return bounds;
}
exports.ExtendBounds = ExtendBounds;
;
exports.ExtendBoundsWithPolyline = function (polyline, bounds) {
    if (polyline === void 0) { polyline = null; }
    if (bounds === void 0) { bounds = L.latLngBounds([]); }
    if (polyline && polyline.getElement()) {
        bounds.extend(polyline.getBounds());
    }
    return bounds;
};
exports.SetStyle = function (item, style) {
    item.setStyle(style);
};
exports.SetMap = function (item, map) {
    if ((item && !item.getElement()) || (item && !item.getElement))
        item.addTo(map);
};
exports.ClearItem = function (item) {
    item.remove();
    item.off();
};
exports.GetLatlng = function (lat, lng) {
    if (lat === void 0) { lat = 0; }
    if (lng === void 0) { lng = 0; }
    return L.latLng(lat, lng);
};
exports.setEncodedPath = function (polyline, encodedPolyline) {
    var path = polyUtil.decode(encodedPolyline);
    return polyline.setLatLngs(path);
};
function HtUpdatePositionPopup(marker, position, infoContent, defaultOption) {
    if (defaultOption === void 0) { defaultOption = {}; }
    marker.setLatLng(position);
    HtUpdatePopup(marker, infoContent, defaultOption);
}
exports.HtUpdatePositionPopup = HtUpdatePositionPopup;
function HtUpdatePopup(marker, infoContent, defaultOption) {
    if (marker.getPopup()) {
        marker.setPopupContent(infoContent);
    }
    else {
        marker.bindPopup(infoContent, defaultOption);
    }
}
exports.HtUpdatePopup = HtUpdatePopup;
function HtUpdatePositionTooltip(marker, position, infoContent, defaultOption) {
    if (infoContent === void 0) { infoContent = ""; }
    if (defaultOption === void 0) { defaultOption = {}; }
    marker.setLatLng(position);
    if (infoContent)
        HtUpdateTooltip(marker, infoContent, defaultOption);
}
exports.HtUpdatePositionTooltip = HtUpdatePositionTooltip;
function HtUpdateTooltip(marker, infoContent, defaultOption) {
    if (marker.getTooltip()) {
        marker.setTooltipContent(infoContent);
    }
    else {
        marker.bindTooltip(infoContent, defaultOption);
    }
}
exports.HtUpdateTooltip = HtUpdateTooltip;
function openTooltip(item, content) {
    if (content)
        item.setTooltipContent(content);
    item.openTooltip();
}
function closeTooltip(item) {
    item.closeTooltip();
}
function openPopup(item, content) {
    if (content)
        item.setPopupContent(content);
    item.openPopup();
}
function closePopup(item) {
    item.closePopup();
}
function bringToFront(item) {
    item.bringToFront();
}
function setFocus(item, map) {
    if (item && item.getElement()) {
        var center = getItemLatlng(item);
        map.panTo(center, { animate: true, duration: 1 });
    }
}
function getItemLatlng(item) {
    return item.getLatLng();
}
function renderMap(elem, options) {
    var map = L.map(elem, options);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return map;
}
function updateCirclePosition(circle, position, infoContent, defaultOption) {
    if (infoContent === void 0) { infoContent = ""; }
    if (defaultOption === void 0) { defaultOption = {}; }
    HtUpdatePositionTooltip(circle, position, infoContent, defaultOption);
}
function getCircleMarker() {
    return L.circleMarker([0, 0]);
}
function getPolyline() {
    return L.polyline([]);
}
function setBounds(map, bounds, options) {
    map.flyToBounds(bounds, options);
}
function isValidBounds(bounds) {
    return bounds.isValid();
}
exports.LeafletUtils = {
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
