"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ht_js_utils_1 = require("ht-js-utils");
var Observable_1 = require("rxjs/Observable");
var config_1 = require("./config");
var HtRequest = (function () {
    function HtRequest(token) {
        if (token === void 0) { token = ""; }
        this.token = token;
        this.baseUrl = 'https://api.hypertrack.com/api/v1/';
        this.token = token || config_1.HtClientConfig.token;
    }
    HtRequest.prototype.headerObj = function () {
        console.log(this.token, "token");
        return { 'Authorization': "token " + this.token };
    };
    HtRequest.prototype.headerStrings = function () {
        return ['Authorization', "token " + this.token];
    };
    HtRequest.prototype.url = function (url, query) {
        if (query === void 0) { query = {}; }
        var string = ht_js_utils_1.HtQuerySerialize(query);
        return this.baseUrl + url + '?' + string;
    };
    HtRequest.prototype.getObservable = function (url, options) {
        if (options === void 0) { options = {}; }
        return Observable_1.Observable.of({});
    };
    HtRequest.prototype.postObservable = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return Observable_1.Observable.of({});
    };
    HtRequest.prototype.api$ = function (url, query) {
        url = this.url(url, query);
        return this.getObservable(url);
    };
    HtRequest.prototype.postApi$ = function (url, body, options) {
        url = this.url(url);
        return this.postObservable(url, body, options);
    };
    return HtRequest;
}());
exports.HtRequest = HtRequest;
// export const htRequest = (options?) => new HtRequest(options); 
