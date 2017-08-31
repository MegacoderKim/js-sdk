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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var time_aware_polyline_1 = require("./time-aware-polyline");
var _ = require("underscore");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/timer");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/take");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
require("rxjs/add/operator/takeUntil");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var TimelineReplay = (function (_super) {
    __extends(TimelineReplay, _super);
    function TimelineReplay() {
        var _this = _super.call(this) || this;
        _this.stats$ = new BehaviorSubject_1.BehaviorSubject(null);
        _this.head$ = new BehaviorSubject_1.BehaviorSubject(null);
        _this.player$ = new BehaviorSubject_1.BehaviorSubject({ isPlaying: false, isStopped: true, speed: 2 });
        // timelineSegment = new TimelineSegment();
        _this.debug = false;
        _this.frameInterval = 50;
        _this.skipStops = false;
        _this.addListerner();
        return _this;
    }
    TimelineReplay.prototype.addListerner = function () {
        var _this = this;
        this.stats$.subscribe(function (stats) {
            _this.stats = stats;
        });
        this.head$.subscribe(function (head) {
            _this.head = head;
        });
        this.player$.subscribe(function (player) {
            _this.player = player;
            if (player.isStopped)
                _this.currentSegmentEffects(null);
        });
    };
    TimelineReplay.prototype.getPositionBearingnAtTime = function (time) {
        if (!this.stats)
            return null;
        // let currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
        // let time = new Date(currentTimeValue).toISOString();
        // console.log(TimeString(time));
        // if(this.player && !this.player.isStopped)
        // if(segment) console.log(segment.type, "segment", TimeString(segment.started_at), TimeString(segment.ended_at));
        var position;
        var bearing;
        var pathSegment = this.getPolylineSegmentForLocationsElapsed(this.timeAwareArray, time);
        if (pathSegment && pathSegment.locations.length > 0) {
            // let pathBeaing = _.last(pathSegment);
            var point = _.last(pathSegment.locations);
            position = [point[0], point[1]];
            bearing = pathSegment.bearing;
            // return [point[0], point[1]]
        }
        else {
            // return null
        }
        return { position: position, bearing: bearing };
    };
    TimelineReplay.prototype.setStats = function (stats) {
        this.stats$.next(stats);
    };
    TimelineReplay.prototype.setReplayHead = function (head) {
        this.head$.next(head);
    };
    TimelineReplay.prototype.getReplayStats = function () {
        return this.stats$.share();
    };
    TimelineReplay.prototype.getReplayHead = function () {
        return this.head$.share();
    };
    TimelineReplay.prototype.currentTimeEffects = function (time) {
    };
    TimelineReplay.prototype.currentSegmentEffects = function (segment) {
    };
    TimelineReplay.prototype.getLastPositionBearing = function () {
        var lastSegTime = _.last(this.timeAwareArray)[2] + '';
        return this.getPositionBearingnAtTime(lastSegTime);
    };
    TimelineReplay.prototype.getLocationsAtTimesT = function (times) {
        return this.getLocationsAtTimes(this.timeAwareArray, times);
    };
    TimelineReplay.prototype.getBounds = function (bounds) {
        if (bounds === void 0) { bounds = L.latLngBounds([]); }
        return _.reduce(this.timeAwareArray, function (bounds, point) {
            return bounds.extend([+point[0], +point[1]]);
        }, bounds);
    };
    TimelineReplay.prototype.getNoTrackingSegments = function (events) {
        return _.reduce(events, function (acc, event) {
            if (acc.start && event.type == 'tracking.started') {
                return {
                    segments: acc.segments.concat([[acc.start, event.recorded_at]]),
                    start: ''
                };
            }
            else if (event.type == 'tracking.ended') {
                return __assign({}, acc, { start: event.recorded_at });
            }
            return acc;
        }, {
            segments: [],
            start: ""
        }).segments;
    };
    //replay player
    TimelineReplay.prototype.goToTimePercent = function (timePercent, toPause) {
        if (toPause === void 0) { toPause = false; }
        if (timePercent < 0)
            timePercent = 0;
        if (timePercent > 100)
            timePercent = 100;
        var time = this.getTimeFromTimePercent(timePercent);
        if (toPause) {
            if (this.player.isStopped)
                this.setPlayer({ isStopped: false });
            this.jumpToTime(time, timePercent);
        }
        else {
            this.goToTime(time, timePercent);
        }
    };
    TimelineReplay.prototype.jumpToTimePercent = function (timePercent) {
        this.goToTimePercent(timePercent, true);
    };
    TimelineReplay.prototype.getNextTimePercent = function (head) {
        return head ? head.timePercent + this.getIncTimePercent(head) : 0;
    };
    TimelineReplay.prototype.getIncTimePercent = function (head) {
        var normalSpeed = 6000;
        var duration = normalSpeed / this.player.speed;
        if (head.currentSegment.type == 'trip') {
            var max = 2 * 60 * 60 * 1000;
            duration = (normalSpeed * Math.min(max, head.currentSegment.durationSeg) / max + normalSpeed) / this.player.speed;
        }
        var segment = head.currentSegment;
        var frameStep = duration / this.frameInterval;
        var segmentGap = (segment.endPercent - segment.startPercent);
        var segmentCurrentGap = segment.endPercent - head.timePercent;
        var maxInc = segmentCurrentGap > 0 ? Math.min(segmentGap, segmentCurrentGap) : segmentGap;
        return Math.min(segmentGap / frameStep, maxInc);
    };
    TimelineReplay.prototype.getTimeFromTimePercent = function (timePercent) {
        var currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
        var currentTime = new Date(currentTimeValue).toISOString();
        return currentTime;
    };
    TimelineReplay.prototype.jumpToTime = function (time, timePercent) {
        this.pause();
        this.goToTime(time, timePercent);
    };
    TimelineReplay.prototype.goToTime = function (time, timePercent) {
        //get head and update head$
    };
    TimelineReplay.prototype.clear = function () {
        if (!this.player.isStopped)
            this.stop();
        this.timeAwareArray = null;
        this.setStats(null);
    };
    TimelineReplay.prototype.play = function () {
        var _this = this;
        this.setPlayer({ isStopped: false, isPlaying: true });
        this.playerSub = Observable_1.Observable.timer(0, this.frameInterval).switchMap(function () { return _this.head$.take(1); })
            .map(function (head) { return _this.getNextTimePercent(head); })
            .takeUntil(this.player$.filter(function (player) { return !player.isPlaying; }).take(1))
            .subscribe(function (timePercent) {
            _this.goToTimePercent(timePercent);
        });
    };
    TimelineReplay.prototype.toggleSkipStops = function () {
        this.skipStops = !this.skipStops;
    };
    TimelineReplay.prototype.pause = function () {
        this.setPlayer({ isPlaying: false });
    };
    TimelineReplay.prototype.stop = function () {
        this.jumpToTimePercent(0);
        this.setPlayer({ isStopped: true, isPlaying: false, speed: 2 });
        this.setReplayHead(null);
    };
    TimelineReplay.prototype.setSpeed = function (speed) {
        this.setPlayer({ speed: speed });
    };
    TimelineReplay.prototype.setPlayer = function (obj) {
        this.player$.next(__assign({}, this.player, obj));
    };
    return TimelineReplay;
}(time_aware_polyline_1.TimeAwarePolyline));
exports.TimelineReplay = TimelineReplay;
