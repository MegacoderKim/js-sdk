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
var ht_js_utils_1 = require("ht-js-utils");
var HtActionMarker = (function (_super) {
    __extends(HtActionMarker, _super);
    function HtActionMarker(showExpected, mapType, options) {
        if (showExpected === void 0) { showExpected = false; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, mapType, options) || this;
        _this.mapType = mapType;
        _this.showExpected = showExpected;
        return _this;
    }
    HtActionMarker.prototype.getInfoContent = function (item) {
        var userName = item.user ? item.user.name : '';
        return "<div class=\"flex-column flex-center\" style=\"min-width: 180px\">\n<div class=\" text-1\">\n    <div class=\"text-center\">" + ht_js_utils_1.NameCase(item.type) + "\n    <span style=\"" + ht_js_utils_1.HtShow(item.display.duration_remaining && !item.display.show_summary) + "\"> in " + ht_js_utils_1.HMString(item.display.duration_remaining / 60) + "</span>\n    <span style=\"" + ht_js_utils_1.HtShow(!!item.completed_at) + "\"> completed at " + ht_js_utils_1.TimeString(item.completed_at) + "</span>\n   \n    </div>\n</div>\n    <div class=\"text-muted text-center\" style=\"" + ht_js_utils_1.HtShow(!!item.completed_at) + "\"> " + ht_js_utils_1.DateString(item.completed_at) + "</div>\n<div class=\"text-center\">" + ht_js_utils_1.NameCase(userName) + "<span style=\"" + ht_js_utils_1.HtShow(!!item.lookup_id, 'block') + "\"> | #" + item.lookup_id + "</span></div>\n</div>";
    };
    HtActionMarker.prototype.unselectedContent = function () {
        var div = "<div style=\"border: 2px solid " + ht_js_utils_1.Color.grey5 + ";border-radius: 50%;width: 17px; height: 17px; background: " + ht_js_utils_1.Color.grey3 + "; margin-top: 6px; margin-left: 6px\"></div>";
        return div;
    };
    return HtActionMarker;
}(map_item_1.HtMapItem));
exports.HtActionMarker = HtActionMarker;
