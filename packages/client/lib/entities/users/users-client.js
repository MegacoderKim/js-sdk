"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_list_client_1 = require("./users-list-client");
var HtUsersClient = (function () {
    function HtUsersClient(req, options) {
        if (options === void 0) { options = {}; }
        this.list = new users_list_client_1.HtUsersListClient(req, options['defaultConfigQuery'], options['listConfig']);
    }
    return HtUsersClient;
}());
exports.HtUsersClient = HtUsersClient;
