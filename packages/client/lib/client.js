"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
var actions_client_1 = require("./entities/actions/actions-client");
var users_client_1 = require("./entities/users/users-client");
var HtClient = (function () {
    function HtClient(request) {
        // this.token = this.token || HtClientConfig.token;
        this.initEntities(request);
    }
    HtClient.prototype.initEntities = function (request) {
        this.actions = new actions_client_1.HtActionsClient(request);
        this.users = new users_client_1.HtUsersClient(request);
    };
    return HtClient;
}());
exports.HtClient = HtClient;
