"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var leaflet_map_utils_1 = require("./leaflet-map-utils");
var google_map_utils_1 = require("./google-map-utils");
var HtMapItem = (function () {
    function HtMapItem(mapType, options) {
        if (options === void 0) { options = {}; }
        this.mapType = mapType;
        this.isFaded = false;
        this.isHighlighted = false;
        this.isOld = false;
        this.googleStyle = {};
        this.leafletStyle = {};
        this.defaultOptions = {
            mapType: 'leaflet',
            defaultStyle: {}
        };
        var newoptions = __assign({}, this.defaultOptions, options);
        var defaultStyle = newoptions.defaultStyle;
        if (defaultStyle)
            this.defaultStyle = defaultStyle;
        this.mapUtils = mapType == 'leaflet' ? leaflet_map_utils_1.LeafletUtils : google_map_utils_1.GoogleMapUtils;
        this.setItem();
    }
    HtMapItem.prototype.setItem = function () {
    };
    HtMapItem.prototype.setMapTypeStyle = function () {
        var style = this.mapType == 'leaflet' ? this.leafletStyle : this.googleStyle;
        this.setStyle(style);
    };
    HtMapItem.prototype.update = function (item, map) {
    };
    HtMapItem.prototype.onUpdate = function (item, map) {
    };
    //todo update data rename
    HtMapItem.prototype.updateItem = function (data) {
        this.id = data.id;
        this.data = data;
        this.isOld = false;
    };
    HtMapItem.prototype.extendBounds = function (bounds) {
        bounds = bounds || this.mapUtils.extendBounds();
        return this.mapUtils.extendBounds(this.item, bounds);
    };
    HtMapItem.prototype.setMap = function (map) {
        this.mapUtils.setMap(this.item, map);
    };
    HtMapItem.prototype.clear = function () {
        if (this.item)
            this.mapUtils.clearItem(this.item);
    };
    HtMapItem.prototype.resetHighlight = function (map) {
        this.reset();
    };
    HtMapItem.prototype.reset = function () {
        this.item.isFaded = false;
        this.resetItem();
        this.closeTooltip();
        this.closePopup();
    };
    HtMapItem.prototype.resetItem = function () {
        this.setStyle(this.defaultStyle);
    };
    HtMapItem.prototype.setStyle = function (style) {
        this.mapUtils.setStyle(this.item, style);
    };
    HtMapItem.prototype.getItemInfoContent = function () {
        return this.getInfoContent(this.data);
    };
    HtMapItem.prototype.getInfoContent = function (item) {
        return "";
    };
    HtMapItem.prototype.openPopup = function (item, content) {
        this.mapUtils.openPopup(item, content);
    };
    HtMapItem.prototype.closePopup = function () {
        this.mapUtils.closePopup(this.item);
    };
    HtMapItem.prototype.openTooltip = function (content) {
        this.mapUtils.openTooltip(this.item, content);
    };
    HtMapItem.prototype.closeTooltip = function () {
        this.mapUtils.closeTooltip(this.item);
    };
    HtMapItem.prototype.bringToFront = function () {
        this.mapUtils.bringToFront(this.item);
    };
    HtMapItem.prototype.highlight = function (map) {
    };
    HtMapItem.prototype.unHighlight = function (map) {
    };
    HtMapItem.prototype.setFocus = function (map) {
        this.mapUtils.setFocus(this.item, map);
    };
    return HtMapItem;
}());
exports.HtMapItem = HtMapItem;
