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
var list_client_1 = require("../../base/list-client");
var users_1 = require("../../api/users");
var HtUsersListClient = (function (_super) {
    __extends(HtUsersListClient, _super);
    function HtUsersListClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtUsersListClient.prototype.setApi = function (request) {
        this.api = new users_1.HtUsersApi(request);
    };
    return HtUsersListClient;
}(list_client_1.HtListClient));
exports.HtUsersListClient = HtUsersListClient;
