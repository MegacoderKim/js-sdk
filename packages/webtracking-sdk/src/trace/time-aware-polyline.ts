var Polyline = require('time-aware-polyline');
import * as _ from "underscore";

export class TimeAwarePolyline {
    encodedPolyline: string;
    timeAwarePolyline: Array<Array<any>>;
    constructor() {

    }

    updateTimeAwarePolyline(encodedPolyline) {
        if(encodedPolyline && this.isNewPolyline(encodedPolyline)) {
            this.encodedPolyline = encodedPolyline;
            this.timeAwarePolyline = Polyline.decodeTimeAwarePolyline(this.encodedPolyline);
        }
    }

    getPolylineToTime(timestamp: string) {
        return Polyline.getLocationsElapsedByTimestamp(this.timeAwarePolyline, timestamp)
    }

    getLatestTime() {
        if(this.timeAwarePolyline && this.timeAwarePolyline.length > 0) {
            return _.last(this.timeAwarePolyline)[2]
        } else {
            return null;
        }
    }

    isNewPolyline(encodedPolyline) {
        return encodedPolyline != this.encodedPolyline;
    }
}