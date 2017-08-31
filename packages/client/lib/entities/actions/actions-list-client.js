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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/expand");
var list_client_1 = require("../../base/list-client");
var actions_1 = require("../../api/actions");
var HtActionsListClient = (function (_super) {
    __extends(HtActionsListClient, _super);
    function HtActionsListClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageDataBeh$ = new BehaviorSubject_1.BehaviorSubject(null);
        return _this;
    }
    HtActionsListClient.prototype.setApi = function (request) {
        this.api = new actions_1.HtActionsApi(request);
    };
    Object.defineProperty(HtActionsListClient.prototype, "pageData$", {
        get: function () {
            // return this.query.switchMap((query) => this.update(query, this.config.isLive))
            return this.pageData$;
        },
        enumerable: true,
        configurable: true
    });
    return HtActionsListClient;
}(list_client_1.HtListClient));
exports.HtActionsListClient = HtActionsListClient;
