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
var marker_item_1 = require("../marker-item");
var ht_js_utils_1 = require("ht-js-utils");
var ht_js_data_1 = require("ht-js-data");
var HtActionMarker = (function (_super) {
    __extends(HtActionMarker, _super);
    function HtActionMarker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leafletSttyle = {
            radius: 10,
            fillColor: ht_js_utils_1.Color.stop,
            fillOpacity: 1,
            weight: 1,
            opacity: 1,
            color: ht_js_utils_1.Color.stopDark,
            pane: 'markerPane'
        };
        _this.googleStyle = {
            icon: {
                fillColor: ht_js_utils_1.Color.blue,
                fillOpacity: 1,
                strokeColor: ht_js_utils_1.Color.grey5,
                strokeOpacity: 1,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                strokeWeight: 4,
            }
        };
        return _this;
    }
    HtActionMarker.prototype.setItem = function () {
        this.item = this.mapUtils.getCircleMarker();
    };
    HtActionMarker.prototype.getPosition = function (data) {
        var position = ht_js_data_1.htAction(data).getPositionsObject().position;
        return this.mapUtils.getLatlng(position[0], position[1]);
    };
    return HtActionMarker;
}(marker_item_1.HtMarkerItem));
exports.HtActionMarker = HtActionMarker;
