"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Polyline = require('time-aware-polyline');
var TimeAwarePolyline = (function () {
    function TimeAwarePolyline() {
    }
    TimeAwarePolyline.prototype.decode = function (encodedPolyline) {
        return Polyline.decodeTimeAwarePolyline(encodedPolyline);
    };
    TimeAwarePolyline.prototype.getPolylineSegmentsForLocationsElapsed = function (timeAwarePolyline, time) {
        return Polyline.getPolylineSegmentsForLocationsElapsed(timeAwarePolyline, time);
    };
    TimeAwarePolyline.prototype.getPolylineSegmentForLocationsElapsed = function (timeAwarePolyline, time) {
        return Polyline.getLocationsTillTimeStamp(timeAwarePolyline, time);
    };
    TimeAwarePolyline.prototype.getLocationsAtTimes = function (timeAwarePolyline, times) {
        return Polyline.getLocationsAtTimestamps(timeAwarePolyline, times);
    };
    return TimeAwarePolyline;
}());
exports.TimeAwarePolyline = TimeAwarePolyline;
