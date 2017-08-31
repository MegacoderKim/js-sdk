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
var map_items_1 = require("../map-items");
var action_marker_1 = require("./action-marker");
var HtActionMarkers = (function (_super) {
    __extends(HtActionMarkers, _super);
    function HtActionMarkers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtActionMarkers.prototype.getItem = function (data) {
        var circle = new action_marker_1.HtActionMarker(this.mapType);
        circle.setMapTypeStyle();
        return circle;
    };
    return HtActionMarkers;
}(map_items_1.HtMapItems));
exports.HtActionMarkers = HtActionMarkers;
