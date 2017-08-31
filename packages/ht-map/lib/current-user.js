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
var marker_item_1 = require("./marker-item");
var HtCurrentUser = (function (_super) {
    __extends(HtCurrentUser, _super);
    function HtCurrentUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtCurrentUser.prototype.getCurrentPosition = function () {
    };
    return HtCurrentUser;
}(marker_item_1.HtMarkerItem));
exports.HtCurrentUser = HtCurrentUser;
