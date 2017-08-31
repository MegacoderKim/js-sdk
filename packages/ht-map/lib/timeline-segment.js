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
var timeline_replay_1 = require("./timeline-replay");
var _ = require("underscore");
var TimelineSegment = (function (_super) {
    __extends(TimelineSegment, _super);
    function TimelineSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineSegment.prototype.update = function (userData) {
        var _this = this;
        var segments = userData.segments;
        // let noTrackingSegments = this.getNoTrackingSegments(userData.events);
        // console.log(noTrackingSegments);
        var lastUpdated = userData.last_heartbeat_at;
        lastUpdated = lastUpdated || new Date().toISOString();
        var duration = 0;
        var totalTimeAwareArray = [];
        this.allSegments = _.reduce(segments, function (acc, segment, i) {
            var segmentLastUpdatedAt = i == segments.length - 1 ? lastUpdated : null;
            var segmentData = _this.getSegmentData(segment, segmentLastUpdatedAt);
            var currentSegment;
            var gapSegment;
            if (segmentData) {
                duration = duration + segmentData.durationSeg;
                totalTimeAwareArray = totalTimeAwareArray.concat(segmentData.timeAwareArray);
                currentSegment = __assign({}, segment, segmentData);
            }
            gapSegment = acc.length && currentSegment ? _this.getGapSegment(currentSegment, _.last(acc)) : null;
            if (gapSegment) {
                var gapSegmentData = _this.getSegmentData(gapSegment, segmentLastUpdatedAt);
                duration = duration + gapSegmentData.durationSeg;
                gapSegment = __assign({}, gapSegment, gapSegmentData);
            }
            acc = gapSegment ? acc.concat([gapSegment]) : acc;
            acc = currentSegment ? acc.concat([currentSegment]) : acc;
            return acc;
        }, []);
        this.timeAwareArray = totalTimeAwareArray;
        // this.timeAwareArray = _.sortBy(totalTimeAwareArray, (array => {
        //   let time = new Date(array[2]).getTime();
        //   return Math.floor(time / 60000)
        // }));
        //sorting messes up stop end and trip start points.
        this.duration = duration;
        this.segments = this.getSegmentsWithPercentMarks(this.allSegments, duration);
        var stats = this.getStats(this.segments);
        this.setStats(stats);
        // console.log(this.segments, "deco");
    };
    TimelineSegment.prototype.currentTimeEffects = function (time) {
    };
    TimelineSegment.prototype.currentSegmentEffects = function (currentSegment) {
        if (this.playSegmentCallback) {
            var segment = currentSegment;
            var segmentId = segment ? segment.id : '';
            this.playSegmentCallback(segmentId);
        }
    };
    TimelineSegment.prototype.getCurrentSegment = function (time) {
        var timeStamp = new Date(time).getTime();
        return _.find(this.segments, function (segment) {
            return segment.start <= timeStamp && segment.end > timeStamp;
        });
    };
    TimelineSegment.prototype.getSegmentsWithPercentMarks = function (segments, duration) {
        segments = _.reduce(segments, function (acc, segment) {
            var startPercent = acc.pStart;
            var segPercent = (segment.durationSeg / duration) * 100;
            var endPercent = Math.min(startPercent + segPercent, 100);
            var filledSegment = __assign({}, segment, { startPercent: startPercent,
                endPercent: endPercent });
            return {
                segments: acc.segments.concat([filledSegment]),
                pStart: endPercent,
                bearing: 0
            };
        }, { segments: [], pStart: 0, bearing: 0 }).segments;
        return segments;
    };
    TimelineSegment.prototype.getTripTimeAwareArray = function (segment, segmentEnd) {
        var timeAwareArray = [];
        // if(segment.start_location && segment.start_location.geojson && segment.started_at) {
        //   let startCord = segment.start_location.geojson.coordinates;
        //   timeAwareArray.push([startCord[1], startCord[0], segment.started_at])
        // }
        if (segment.time_aware_polyline) {
            timeAwareArray.push.apply(timeAwareArray, this.decode(segment.time_aware_polyline));
        }
        else if (segmentEnd) {
            var lastPoint = _.last(timeAwareArray);
            if (lastPoint)
                timeAwareArray.push([lastPoint[0], lastPoint[1], segmentEnd]);
        }
        return timeAwareArray;
    };
    TimelineSegment.prototype.getStopTimeAwareArray = function (segment, segmentEnd) {
        var timeAwareArray = [];
        var coord = segment.location && segment.location.geojson ? segment.location.geojson.coordinates : null;
        if (coord) {
            var position = [coord[1], coord[0]];
            timeAwareArray = [position.concat([segment.started_at]), position.concat([segmentEnd])];
        }
        return timeAwareArray;
    };
    TimelineSegment.prototype.getStats = function (segments) {
        if (segments.length) {
            var lastSeg = _.last(segments);
            var start = segments[0].start;
            var end = lastSeg.end;
            //todo duration as sum of segments
            var stats = {
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
                duration: end - start,
                distance: 0,
                timeAwarePolylineArray: this.timeAwareArray,
                segments: segments
            };
            return stats;
        }
        return null;
    };
    TimelineSegment.prototype.getSegmentData = function (segment, lastUpdatedAt) {
        var segmentEnd = segment.ended_at || lastUpdatedAt;
        var segmentStart = segment.started_at;
        if (!segmentEnd || !segmentStart)
            return null;
        var end = new Date(segmentEnd).getTime();
        var start = new Date(segmentStart).getTime();
        var durationSeg = end - start;
        var timeAwareArray;
        if (segment.type == 'trip') {
            timeAwareArray = this.getTripTimeAwareArray(segment, segmentEnd);
        }
        else if (!segment.timeAwareArray) {
            timeAwareArray = this.getStopTimeAwareArray(segment, segmentEnd);
        }
        return {
            timeAwareArray: timeAwareArray,
            end: end,
            start: start,
            durationSeg: durationSeg
        };
    };
    TimelineSegment.prototype.getGapSegment = function (segment, segment2) {
        // let firstPoint = ;
        // let lastPoint = _.first(segment.timeAwareArray);
        var started_at = segment2['ended_at'];
        var ended_at = segment['started_at'];
        var timeAwareArray = [];
        // console.log(firstPoint, lastPoint, "fl");
        if (started_at && ended_at) {
            // let started_at = firstPoint[2];
            // let ended_at =  lastPoint[2];
            return segment.start - segment2.end > 3 * 60000 ?
                {
                    ended_at: ended_at,
                    started_at: started_at,
                    timeAwareArray: timeAwareArray,
                    type: 'gap'
                } : null;
        }
        else {
            return null;
        }
    };
    TimelineSegment.prototype.clearTimeline = function () {
        this.clear();
    };
    TimelineSegment.prototype.goToTime = function (time, timePercent) {
        //get head and update head$
        var _a = this.getPositionBearingnAtTime(time), position = _a.position, bearing = _a.bearing;
        var currentSegment = this.getCurrentSegment(time);
        var head = {
            currentTime: time,
            timePercent: timePercent,
            currentPosition: position,
            bearing: bearing,
            currentSegment: currentSegment,
            segmentPercent: 0
        };
        this.currentSegmentEffects(currentSegment);
        this.currentTimeEffects(time);
        this.setReplayHead(head);
    };
    return TimelineSegment;
}(timeline_replay_1.TimelineReplay));
exports.TimelineSegment = TimelineSegment;
