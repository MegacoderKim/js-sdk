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
var HtMarkerItem = (function (_super) {
    __extends(HtMarkerItem, _super);
    function HtMarkerItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtMarkerItem.prototype.update = function (data, map) {
        var position = this.getPosition(data);
        this.mapUtils.updatePosition(this.item, position);
    };
    HtMarkerItem.prototype.getPosition = function (item) {
        return this.mapUtils.getLatlng(item.position[0], item.position[1]);
    };
    return HtMarkerItem;
}(map_item_1.HtMapItem));
exports.HtMarkerItem = HtMarkerItem;
