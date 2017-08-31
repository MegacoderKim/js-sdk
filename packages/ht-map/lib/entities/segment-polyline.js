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
var polyline_1 = require("../polyline");
var HtSegmentPolyline = (function (_super) {
    __extends(HtSegmentPolyline, _super);
    function HtSegmentPolyline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.googleStyle = {
            strokeColor: ht_js_utils_1.Color.blue,
            strokeOpacity: 1,
            strokeWeight: 5
        };
        return _this;
    }
    return HtSegmentPolyline;
}(polyline_1.HtPolyline));
exports.HtSegmentPolyline = HtSegmentPolyline;
