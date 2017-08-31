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
var _ = require("underscore");
var map_item_1 = require("./map-item");
var leaflet_map_utils_1 = require("./leaflet-map-utils");
var google_map_utils_1 = require("./google-map-utils");
var HtMapItems = (function () {
    function HtMapItems(mapType, options) {
        if (options === void 0) { options = {}; }
        this.mapType = mapType;
        this.itemEntities = {};
        this.defaultStyle = {};
        this.fadeStyle = {};
        this.defaultOptions = {
            mapType: 'leaflet',
            defaultStyle: {}
        };
        var newoptions = __assign({}, this.defaultOptions, options);
        var defaultStyle = newoptions.defaultStyle;
        if (defaultStyle)
            this.defaultStyle = defaultStyle;
        this.mapUtils = mapType == 'leaflet' ? leaflet_map_utils_1.LeafletUtils : google_map_utils_1.GoogleMapUtils;
    }
    // constructor(mapUtils: MapUtils = LeafletUtils, defaultStyle?) {
    //   if(this.defaultStyle) this.defaultStyle = defaultStyle;
    //   this.mapUtils = mapUtils;
    // }
    HtMapItems.prototype.traceOnMap = function (items, map) {
        this.trace(items, map, true);
    };
    HtMapItems.prototype.trace = function (items, map, setMap) {
        if (setMap === void 0) { setMap = false; }
        this.map = map;
        if (items && items.length)
            this.traceItems(items, setMap);
        this.bustOlditem();
    };
    HtMapItems.prototype.getItem = function (data) {
        return new map_item_1.HtMapItem(this.mapType);
    };
    HtMapItems.prototype.itemEffect = function (item) {
    };
    HtMapItems.prototype.traceItemEffect = function (itemEntities) {
    };
    HtMapItems.prototype.extendBounds = function (bounds) {
        bounds = bounds || this.mapUtils.extendBounds();
        var newBounds = _.reduce(this.itemEntities, function (bounds, item) {
            return item.extendBounds(bounds);
        }, bounds);
        return newBounds;
    };
    HtMapItems.prototype.addClick = function (cb) {
        _.each(this.itemEntities, function (item) {
            item.item.on('click', function () {
                cb(item.data);
            });
        });
    };
    HtMapItems.prototype.onHoverIn = function (cb) {
        _.each(this.itemEntities, function (item) {
            item.item.on('mouseover', function () {
                // console.log("mouseover");
                cb(item.data);
            });
        });
    };
    HtMapItems.prototype.onHoverOut = function (cb) {
        _.each(this.itemEntities, function (item) {
            item.item.on('mouseout', function () {
                cb(item.data);
            });
        });
    };
    ;
    HtMapItems.prototype.unHighlight = function () {
        var _this = this;
        this.onEach(function (item) {
            item.unHighlight(_this.map);
            item.isFaded = true;
        });
    };
    HtMapItems.prototype.highlight = function (selectedItem, toHighlight) {
        var _this = this;
        if (toHighlight === void 0) { toHighlight = true; }
        this.onEach(function (item) {
            if (toHighlight) {
                if (selectedItem && item.id != selectedItem.id) {
                    _this.unHighlightItem(item);
                }
                else {
                    _this.highlightItem(item);
                }
            }
            else {
                _this.resetHighlight(item);
            }
        });
    };
    HtMapItems.prototype.unHighlightItem = function (item) {
        item.isFaded = true;
        item.unHighlight(this.map);
    };
    HtMapItems.prototype.highlightItem = function (item) {
        item.isHighlighted = true;
        item.highlight(this.map);
    };
    HtMapItems.prototype.setFade = function (selectedItem, toFade) {
        var _this = this;
        if (toFade === void 0) { toFade = true; }
        _.each(this.itemEntities, function (item) {
            if (toFade) {
                // console.log(this.fadeStyle);
                if (selectedItem && item.id == selectedItem.id) {
                    item.bringToFront();
                }
                else {
                    item.setStyle(_this.fadeStyle);
                }
            }
            else {
                // console.log(this.defaultStyle);
                item.setStyle(_this.defaultStyle);
            }
            // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
        });
    };
    HtMapItems.prototype.resetHighlights = function () {
        var _this = this;
        this.onEach(function (item) {
            _this.resetHighlight(item);
        });
    };
    HtMapItems.prototype.onEach = function (cb) {
        _.each(this.itemEntities, function (item) {
            cb(item);
        });
    };
    HtMapItems.prototype.resetHighlight = function (item) {
        item.isFaded = false;
        item.isHighlighted = false;
        item.resetHighlight(this.map);
    };
    HtMapItems.prototype.resetItems = function () {
        var _this = this;
        _.each(this.itemEntities, function (item) {
            _this.resetItem(item);
        });
    };
    HtMapItems.prototype.resetItem = function (item) {
        item.reset();
    };
    HtMapItems.prototype.bustOlditem = function () {
        var _this = this;
        _.each(this.itemEntities, function (item) {
            if (item.isOld) {
                _this.removeItem(item);
            }
            else {
                item.isOld = true;
            }
        });
    };
    HtMapItems.prototype.traceItems = function (items, setMap) {
        var _this = this;
        if (setMap === void 0) { setMap = false; }
        var traceItems = items.slice();
        // let lastItem = traceItems.pop();
        _.each(traceItems, function (item) {
            if (_this.itemEntities[item.id]) {
                _this.updateItem(item, setMap);
            }
            else {
                _this.createItem(item, setMap);
            }
        });
        this.traceItemEffect(this.itemEntities);
        // this.updateItem(lastItem);
    };
    HtMapItems.prototype.updateItem = function (data, setMap) {
        if (setMap === void 0) { setMap = false; }
        var mapitem = this.itemEntities[data.id];
        if (mapitem) {
            mapitem.updateItem(data);
            if (setMap)
                mapitem.setMap(this.map);
            mapitem.update(data, this.map);
            mapitem.onUpdate(data, this.map);
        }
        else {
            this.createItem(data, setMap);
        }
    };
    HtMapItems.prototype.createItem = function (data, setMap) {
        if (setMap === void 0) { setMap = false; }
        var item = this.getItem(data);
        this.itemEffect(item);
        this.itemEntities[data.id] = item;
        this.updateItem(data, setMap);
    };
    HtMapItems.prototype.removeItem = function (item) {
        item.clear();
        var id = item.id;
        if (this.itemEntities[id])
            delete this.itemEntities[id];
    };
    HtMapItems.prototype.clearAll = function () {
        _.each(this.itemEntities, function (item) {
            item.clear();
        });
    };
    return HtMapItems;
}());
exports.HtMapItems = HtMapItems;
