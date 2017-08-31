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
var map_items_1 = require("./map-items");
var _ = require("underscore");
var timeline_segment_1 = require("./timeline-segment");
var current_user_1 = require("./current-user");
var marker_item_1 = require("./marker-item");
var segment_polylines_1 = require("./entities/segment-polylines");
var stop_markers_1 = require("./entities/stop-markers");
var action_markers_1 = require("./entities/action-markers");
var ht_js_data_1 = require("ht-js-data");
var HtSegmentsTrace = (function () {
    function HtSegmentsTrace(mapType) {
        if (mapType === void 0) { mapType = 'leaflet'; }
        var _this = this;
        this.timelineSegment = new timeline_segment_1.TimelineSegment();
        this.allowedEvents = {};
        this.initBaseItems(mapType);
        this.timelineSegment.head$.filter(function () { return !!_this.map; }).subscribe(function (head) {
            _this.setReplayHead(head, _this.map);
        });
    }
    HtSegmentsTrace.prototype.initBaseItems = function (mapType) {
        this.segmentsPolylines = new segment_polylines_1.HtSegmentPolylines(mapType);
        this.stopMarkers = new stop_markers_1.HtStopMarkers(mapType);
        this.actionMarkers = new action_markers_1.HtActionMarkers(mapType);
        this.actionsPolylines = new map_items_1.HtMapItems(mapType);
        this.userMarker = new current_user_1.HtCurrentUser(mapType);
        this.replayMarker = new marker_item_1.HtMarkerItem(mapType);
        this.eventMarkers = new map_items_1.HtMapItems(mapType);
        this.initItems(mapType);
    };
    HtSegmentsTrace.prototype.initItems = function (mapType) {
    };
    HtSegmentsTrace.prototype.trace = function (user, map, params) {
        if (params === void 0) { params = {}; }
        this.map = map;
        var userSegments = user && user.segments ? user.segments : [];
        var segType = this.getSegmentTypes(userSegments);
        if (this.segmentsPolylines)
            this.segmentsPolylines.trace(segType.tripSegment, map, true);
        if (this.stopMarkers)
            this.stopMarkers.trace(segType.stopSegment, map, true);
        this.traceAction(user, map);
        this.traceCurrentUser(_.last(userSegments), map);
        this.traceActionPolyline(user, map, this.getCurrentUserPosition());
        // this.traceEvents(user, ht-map)
    };
    HtSegmentsTrace.prototype.highlightAll = function (toHighlight) {
        this.segmentsPolylines.highlight({}, !!toHighlight);
        this.stopMarkers.highlight({}, !!toHighlight);
    };
    HtSegmentsTrace.prototype.extendBounds = function (bounds) {
        bounds = this.stopMarkers.extendBounds(bounds);
        bounds = this.segmentsPolylines.extendBounds(bounds);
        bounds = this.actionMarkers.extendBounds(bounds);
        // console.log(bounds, "final");
        return bounds;
    };
    HtSegmentsTrace.prototype.selectSegment = function (segment) {
        if (segment.type == 'trip') {
            this.segmentsPolylines.highlight(segment);
            this.stopMarkers.unHighlight();
        }
        else if (segment.type == 'stop') {
            this.stopMarkers.highlight(segment);
            // this.segmentsPolylines.unHighlight();
        }
        this.selectSegmentEffect(segment);
    };
    HtSegmentsTrace.prototype.unselectSegment = function (segment) {
        if (segment.type == 'trip') {
            this.segmentsPolylines.resetHighlights();
            this.stopMarkers.resetHighlights();
        }
        else if (segment.type == 'stop') {
            // console.log("stop select");
            this.stopMarkers.resetHighlights();
            this.stopMarkers.resetHighlights();
            // this.segmentsPolylines.resetHighlights();
        }
        this.unselectSegmentEffect(segment);
    };
    HtSegmentsTrace.prototype.selectSegmentEffect = function (segment) {
        this.actionMarkers.highlight({});
    };
    HtSegmentsTrace.prototype.unselectSegmentEffect = function (segment) {
        this.actionMarkers.resetHighlights();
    };
    HtSegmentsTrace.prototype.traceAction = function (user, map) {
        var actions = user && user.actions ? user.actions : [];
        var filteredActions = _.filter(actions, function (action) {
            return ht_js_data_1.htAction(action).isValidMarker();
            // return !!((action.expected_place && action.expected_place.location) || (action.completed_place && action.completed_place.location));
        });
        if (this.actionMarkers)
            this.actionMarkers.trace(filteredActions, map, true);
    };
    HtSegmentsTrace.prototype.traceActionPolyline = function (user, map, currentPosition) {
        var actions = user && user.actions ? user.actions : [];
        var ongoingAction = currentPosition ?
            actions : [];
        if (currentPosition) {
            var polylines = this.getActionPolylineWithId(currentPosition, ongoingAction);
            // console.log(polylines);
            this.actionsPolylines.trace(polylines, map, true);
        }
        else {
            this.actionsPolylines.clearAll();
        }
    };
    HtSegmentsTrace.prototype.getActionPolylineWithId = function (currentPosition, items) {
        var sortedAction = _.sortBy(items, function (action) {
            var finalEta = action.eta || action.expected_at;
            return finalEta;
        });
        var polylinesWithId = sortedAction.reduce(function (acc, action) {
            var finalEta = action.eta || action.expected_at;
            if (finalEta && !action.display.show_summary) {
                var _a = ht_js_data_1.htAction(action).getPositionsObject().position, lat = _a.lat, lng = _a.lng;
                var actionPosition = [lat, lng];
                if (acc.length == 0) {
                    return actionPosition ? acc.concat([{
                            path: [currentPosition, actionPosition],
                            id: action.id
                        }]) : acc;
                }
                else {
                    var pastPoint = _.last(acc).path[1];
                    return actionPosition ? acc.concat([{
                            path: [pastPoint, actionPosition],
                            id: action.id
                        }]) : acc;
                }
            }
            else {
                return acc;
            }
        }, []);
        return polylinesWithId;
    };
    HtSegmentsTrace.prototype.selectAction = function (actionId) {
        if (actionId) {
            this.actionMarkers.highlight({ id: actionId });
        }
        else {
            this.actionMarkers.resetHighlights();
        }
        this.highlightAll(!!actionId);
    };
    HtSegmentsTrace.prototype.getSegmentTypes = function (userSegments) {
        return _.reduce(userSegments, function (segmentType, segment) {
            if (segment.type == 'stop') {
                if (segment.location && segment.location.geojson)
                    segmentType.stopSegment.push(segment);
            }
            else {
                if (segment.encoded_polyline)
                    segmentType.tripSegment.push(segment);
            }
            return segmentType;
        }, { tripSegment: [], stopSegment: [] });
    };
    HtSegmentsTrace.prototype.traceCurrentUser = function (segment, map) {
        if (segment && this.timelineSegment.timeAwareArray && this.timelineSegment.timeAwareArray.length) {
            // let lastSegment = segment;
            var positionBearing = this.timelineSegment.getLastPositionBearing();
            this.userMarker.update({ segment: segment, positionBearing: positionBearing }, map);
        }
        else {
            this.userMarker.clear();
        }
    };
    //segments replay
    HtSegmentsTrace.prototype.clearTimeline = function () {
        this.timelineSegment.clearTimeline();
    };
    Object.defineProperty(HtSegmentsTrace.prototype, "stats", {
        get: function () {
            return this.timelineSegment.stats;
        },
        enumerable: true,
        configurable: true
    });
    // get segments() {
    //   return this.timelineSegment.segments
    // }
    HtSegmentsTrace.prototype.updateTimeline = function (user) {
        this.timelineSegment.update(user);
    };
    HtSegmentsTrace.prototype.getCurrentUserPosition = function () {
        return this.userMarker.getCurrentPosition();
    };
    HtSegmentsTrace.prototype.focusUserMarker = function (map) {
        this.userMarker.setFocus(map);
    };
    HtSegmentsTrace.prototype.setSegmentPlayCallback = function (cb) {
        this.timelineSegment.playSegmentCallback = cb;
    };
    HtSegmentsTrace.prototype.setReplayHead = function (head, map) {
        if (head && head.currentPosition) {
            this.replayMarker.setPositionBearing([head.currentPosition[0], head.currentPosition[1]], head.bearing, map);
        }
        else {
            this.replayMarker.clear();
        }
    };
    HtSegmentsTrace.prototype.traceEvents = function (user, map) {
        var _this = this;
        var events = user && user.events ? user.events : [];
        var locations = this.timelineSegment.getLocationsAtTimesT(events.map(function (event) { return event.recorded_at; }));
        var eventsWithPosition = events.reduce(function (acc, event, i) {
            var info = _this.allowedEvents[event.type];
            if (info) {
                var lastEvent = _.last(acc);
                var sameAsLastEvent = lastEvent && lastEvent.recorded_at == event.recorded_at;
                if (sameAsLastEvent) {
                    var lastInfo = lastEvent.info + ', ' + info;
                    var newLastEvent = __assign({}, lastEvent, { info: lastInfo });
                    acc.pop();
                    return acc.concat([newLastEvent]);
                }
                else {
                    var position = locations[i];
                    // let position = this.timelinePolyline.getLocationAtTime(event.recorded_at);
                    if (position.length) {
                        var eventWithPosition = __assign({}, event, { position: position, info: info });
                        return acc.concat([eventWithPosition]);
                    }
                    else {
                        return acc;
                    }
                }
            }
            else {
                return acc;
            }
        }, []);
        this.eventMarkers.trace(eventsWithPosition, map, true);
    };
    return HtSegmentsTrace;
}());
exports.HtSegmentsTrace = HtSegmentsTrace;
;
