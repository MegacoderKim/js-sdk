"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var interfaces_1 = require("../interfaces");
var _ = require("underscore");
var ht_js_utils_1 = require("ht-js-utils");
var base_1 = require("../api/base");
var HtListClient = (function () {
    function HtListClient(request, defaultConfigQuery, config) {
        if (defaultConfigQuery === void 0) { defaultConfigQuery = {}; }
        if (config === void 0) { config = interfaces_1.defaultListConfig; }
        this.defaultConfigQuery = defaultConfigQuery;
        this.config = config;
        this.pageDataBeh$ = new BehaviorSubject_1.BehaviorSubject(null);
        this.listQueryBeh$ = new BehaviorSubject_1.BehaviorSubject({});
        this.pageQueryBeh$ = new BehaviorSubject_1.BehaviorSubject({});
        this.dateRangeQueryBeh$ = new BehaviorSubject_1.BehaviorSubject({});
        this.setApi(request);
        this.setDefaultQuery(defaultConfigQuery);
        this.query = Observable_1.Observable.combineLatest(this.listQuery$, this.pageQuery$, this.dateRangeQuery$).map(function (_a) {
            var listQuery = _a[0], pageQuery = _a[1], dateRangeQuery = _a[2];
            return __assign({}, listQuery, pageQuery, dateRangeQuery);
        });
        // this.initListeners()
    }
    HtListClient.prototype.init = function (_a, config) {
        var listQuery = _a.listQuery, pageQuery = _a.pageQuery, dateRangeQuery = _a.dateRangeQuery;
        if (config)
            this.config = config;
        this.updateListQuery(listQuery);
        this.updatePageQuery(pageQuery);
        this.updateDateRangeQuery(dateRangeQuery);
        this.initListeners();
    };
    HtListClient.prototype.initListeners = function () {
        var _this = this;
        this.update$ = this.query.switchMap(function (query) { return _this.update(query, _this.config.isLive); }).subscribe(function (pageData) {
            _this.pageDataBeh$.next(pageData);
        });
        // this.query.switchMap((query) => this.update(query, this.config.isLive))
    };
    HtListClient.prototype.setApi = function (request) {
        this.api = new base_1.HtBaseApi('', request);
    };
    HtListClient.prototype.setDefaultQuery = function (defaultConfigQuery) {
        this.updateListQuery();
        this.updatePageQuery();
        this.updateDateRangeQuery();
    };
    Object.defineProperty(HtListClient.prototype, "pageData$", {
        get: function () {
            // return this.query.switchMap((query) => this.update(query, this.config.isLive))
            return this.pageDataBeh$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtListClient.prototype, "listQuery$", {
        get: function () {
            return this.listQueryBeh$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtListClient.prototype, "pageQuery$", {
        get: function () {
            return this.pageQueryBeh$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtListClient.prototype, "dateRangeQuery$", {
        get: function () {
            return this.dateRangeQueryBeh$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    HtListClient.prototype.updateListQuery = function (listQuery) {
        var _this = this;
        var query = listQuery || this.defaultConfigQuery.listQuery;
        if (query) {
            this.listQuery$.take(1).map(function (currentQuery) {
                return __assign({}, currentQuery, query);
            }).subscribe(function (query) { return _this.setListQuery(query); });
        }
    };
    HtListClient.prototype.updatePageQuery = function (pageQuery) {
        var _this = this;
        var query = pageQuery || this.defaultConfigQuery.pageQuery;
        if (query) {
            this.pageQuery$.take(1).map(function (currentQuery) {
                return __assign({}, currentQuery, query);
            }).subscribe(function (query) { return _this.setPageQuery(query); });
        }
    };
    HtListClient.prototype.updateDateRangeQuery = function (dateRangeQuery) {
        var _this = this;
        var query = dateRangeQuery || this.defaultConfigQuery.dateRangeQuery;
        if (query) {
            this.dateRangeQuery$.take(1).map(function (currentQuery) {
                return __assign({}, currentQuery, query);
            }).subscribe(function (query) { return _this.setDateRangeQuery(query); });
        }
    };
    HtListClient.prototype.setListQuery = function (listQuery) {
        var query = listQuery || this.defaultConfigQuery.listQuery;
        if (query) {
            this.listQueryBeh$.next(query);
        }
    };
    HtListClient.prototype.setPageQuery = function (pageQuery) {
        var query = pageQuery || this.defaultConfigQuery.pageQuery;
        if (query) {
            this.pageQueryBeh$.next(query);
        }
    };
    HtListClient.prototype.setDateRangeQuery = function (dateRangeQuery) {
        var query = dateRangeQuery || this.defaultConfigQuery.dateRangeQuery;
        if (query) {
            this.dateRangeQueryBeh$.next(query);
        }
    };
    HtListClient.prototype.turnPage = function (next) {
        var _this = this;
        if (next === void 0) { next = true; }
        this.pageData$.take(1)
            .map(function (pageData) { return next ? pageData.next : pageData.previous; })
            .map(function (url) { return url ? ht_js_utils_1.GetUrlParam('page', url) : false; })
            .filter(function (page) { return !!page; }).map(function (page) {
            return { page: +page };
        })
            .subscribe(function (pageQuery) { return _this.updatePageQuery(pageQuery); });
    };
    HtListClient.prototype.setPage = function (number) {
        var _this = this;
        this.pageData$.take(1)
            .filter(function (pageData) { return !!_this.isValidPage(pageData.results.length, pageData.count, number); })
            .map(function () {
            return { page: +number };
        }).subscribe(function (pageQuery) { return _this.updatePageQuery(pageQuery); });
    };
    HtListClient.prototype.isValidPage = function (pageSize, count, page) {
        if (pageSize === void 0) { pageSize = 50; }
        if (page === void 0) { page = 1; }
        if (page == 1)
            return true;
        if (page < 1)
            return false;
        return +count > (page - 1) * +pageSize;
    };
    HtListClient.prototype.update = function (query, isLive) {
        var _this = this;
        if (isLive === void 0) { isLive = false; }
        return this.api.index(query)
            .expand(function (pageData) {
            return Observable_1.Observable.timer(10000).switchMap(function () {
                var toUpdate = !isLive || (pageData && pageData.results.length);
                var updateQuery = toUpdate ? __assign({}, query, { id: _this.getIds(pageData).toString(), page: null }) : query;
                return _this.api.index(updateQuery)
                    .map(function (updatedPageData) {
                    if (toUpdate) {
                        return _this.updatedPageData(pageData, updatedPageData);
                    }
                    else {
                        return updatedPageData;
                    }
                });
            });
        });
    };
    HtListClient.prototype.updatedPageData = function (pageData, updatedPageData) {
        var updatedDic = _.indexBy(updatedPageData.results, 'id');
        var results = _.map(pageData.results, function (action) {
            return updatedDic[action.id] || action;
        });
        return __assign({}, pageData, { results: results });
    };
    HtListClient.prototype.getIds = function (pageData) {
        var ids = _.map(pageData.results, function (data) { return data.id; });
        return ids;
    };
    HtListClient.prototype.clear = function () {
        if (this.update$)
            this.update$.unsubscribe();
    };
    return HtListClient;
}());
exports.HtListClient = HtListClient;
