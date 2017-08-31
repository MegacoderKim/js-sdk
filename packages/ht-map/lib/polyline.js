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
var map_item_1 = require("./map-item");
var HtPolyline = (function (_super) {
    __extends(HtPolyline, _super);
    function HtPolyline(mapType, options) {
        var _this = _super.call(this, mapType, options) || this;
        _this.item = _this.mapUtils.getPolyline();
        return _this;
    }
    HtPolyline.prototype.update = function (data, map) {
        this.mapUtils.setEncodedPath(this.item, this.getEncodedPath(data));
    };
    HtPolyline.prototype.getEncodedPath = function (data) {
        return data.encoded_polyline;
    };
    HtPolyline.prototype.extendBounds = function (bounds) {
        return this.mapUtils.extendBoundsWithPolyline(this.item, bounds);
    };
    return HtPolyline;
}(map_item_1.HtMapItem));
exports.HtPolyline = HtPolyline;
