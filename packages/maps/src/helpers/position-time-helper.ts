import {IPathSegment, ITimeAwarePoint} from "ht-models";
var Polyline = require('time-aware-polyline');

export const positionTime = {
  positionTimePoints: [],
  decode(encodedPolyline): ITimeAwarePoint[] {
    this.positionTimePoints = Polyline.decodeTimeAwarePolyline(encodedPolyline);
    return this.positionTimePoints;
  },

};