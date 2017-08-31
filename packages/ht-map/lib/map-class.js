"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var leaflet_map_utils_1 = require("./leaflet-map-utils");
var google_map_utils_1 = require("./google-map-utils");
var segments_trace_1 = require("./segments-trace");
var HtMapClass = (function () {
    function HtMapClass(mapType, options) {
        if (mapType === void 0) { mapType = 'leaflet'; }
        if (options === void 0) { options = {}; }
        this.mapType = mapType;
        this.leafletSetBoundsOptions = {
            animate: true,
            duration: 0.3
        };
        this.googleSetBoundsOptions = {};
        this.mapUtils = mapType == 'leaflet' ? leaflet_map_utils_1.LeafletUtils : google_map_utils_1.GoogleMapUtils;
        // this.initMap(elem, options);
        this.segmentTrace = new segments_trace_1.HtSegmentsTrace(this.mapType);
    }
    HtMapClass.prototype.initMap = function (elem, options) {
        if (options === void 0) { options = {}; }
        this.map = this.mapUtils.renderMap(elem, options);
    };
    HtMapClass.prototype.tracePlaceline = function (user) {
        this.segmentTrace.trace(user, this.map);
    };
    HtMapClass.prototype.resetBounds = function (options, bounds) {
        bounds = this.segmentTrace.extendBounds(bounds);
        if (bounds && this.mapUtils.isValidBounds(bounds))
            this.setBounds(bounds, options);
    };
    ;
    HtMapClass.prototype.setBounds = function (bounds, options) {
        options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
        this.mapUtils.setBounds(this.map, bounds, options);
    };
    return HtMapClass;
}());
exports.HtMapClass = HtMapClass;
