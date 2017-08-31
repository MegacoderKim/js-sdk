"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ht_js_utils_1 = require("ht-js-utils");
var marker_item_1 = require("../marker-item");
var HtStopMarker = (function (_super) {
    __extends(HtStopMarker, _super);
    function HtStopMarker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leafletStyle = {
            radius: 10,
            fillColor: ht_js_utils_1.Color.stop,
            fillOpacity: 1,
            weight: 1,
            color: ht_js_utils_1.Color.stopDark,
            pane: 'markerPane'
        };
        _this.googleStyle = {
            icon: {
                fillColor: ht_js_utils_1.Color.stop,
                fillOpacity: 1,
                strokeColor: ht_js_utils_1.Color.stopDark,
                strokeOpacity: 1,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeWeight: 2,
            }
        };
        return _this;
    }
    HtStopMarker.prototype.setItem = function () {
        this.item = this.mapUtils.getCircleMarker();
    };
    HtStopMarker.prototype.getPosition = function (item) {
        return this.mapUtils.getLatlng(item.location.geojson.coordinates[1], item.location.geojson.coordinates[0]);
    };
    return HtStopMarker;
}(marker_item_1.HtMarkerItem));
exports.HtStopMarker = HtStopMarker;
