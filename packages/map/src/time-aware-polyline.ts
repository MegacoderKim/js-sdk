import {IPathSegment, ITimeAwarePoint} from "../model/common";
import * as _ from 'underscore';
var Polyline = require('time-aware-polyline');

export class TimeAwarePolyline {
  timeAwareArray: ITimeAwarePoint[];

  constructor() {

  }

  decode(encodedPolyline): ITimeAwarePoint[] {
    return Polyline.decodeTimeAwarePolyline(encodedPolyline);
  }

  getPolylineSegmentsForLocationsElapsed(timeAwarePolyline: ITimeAwarePoint[], time: string): IPathSegment[] {
    return Polyline.getPolylineSegmentsForLocationsElapsed(timeAwarePolyline, time)
  }

  getLocationsAtTimes(timeAwarePolyline: ITimeAwarePoint[], times: string[]) {
    return Polyline.getLocationsAtTimestamps(timeAwarePolyline, times)
  }

}