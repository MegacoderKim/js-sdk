"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/combineLatest");
require("rxjs/add/operator/expand");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/takeUntil");
require("rxjs/add/observable/timer");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/take");
var actions_list_client_1 = require("./actions-list-client");
var HtActionsClient = (function () {
    function HtActionsClient(req, options) {
        if (options === void 0) { options = {}; }
        // let {listConfig, defaultConfigQuery} = options;
        this.list = new actions_list_client_1.HtActionsListClient(req, options['defaultConfigQuery'], options['listConfig']);
    }
    HtActionsClient.prototype.updateListQuery = function () {
    };
    return HtActionsClient;
}());
exports.HtActionsClient = HtActionsClient;
