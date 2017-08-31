"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
var HtBaseApi = (function () {
    function HtBaseApi(base, request) {
        this.base = base;
        this.setRequest(request);
    }
    HtBaseApi.prototype.setRequest = function (request) {
        this.request = request;
    };
    HtBaseApi.prototype.get = function (id, query) {
        var tail = "/" + id + "/";
        return this.getReqFromTail(tail, query);
    };
    HtBaseApi.prototype.index = function (query) {
        var tail = "/";
        return this.getReqFromTail(tail, query);
    };
    HtBaseApi.prototype.summary = function (query) {
        var tail = "/summary/";
        return this.getReqFromTail(tail, query);
    };
    HtBaseApi.prototype.heatmap = function (query) {
        var tail = "/heatmap/";
        return this.getReqFromTail(tail, query);
    };
    HtBaseApi.prototype.getReqFromTail = function (tail, query) {
        return this.request.api$(this.base + tail, query);
    };
    HtBaseApi.prototype.placeline = function (id, query) {
        var tail = "/timeline/" + id + "/";
        return this.getReqFromTail(tail, query);
    };
    return HtBaseApi;
}());
exports.HtBaseApi = HtBaseApi;
