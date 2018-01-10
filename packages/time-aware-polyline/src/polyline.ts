import { TimeAwarePolyline } from "./time-aware";

export class PolylineUtils {
  encodedPolyline: string;
  timeAwarePolyline: Array<Array<any>>;
  polyline = new TimeAwarePolyline();
  constructor() {

  }

  updateTimeAwarePolyline(encodedPolyline) {
    if(this.isNewPolyline(encodedPolyline)) {
      this.encodedPolyline = encodedPolyline;
      this.timeAwarePolyline = this.polyline.decodeTimeAwarePolyline(this.encodedPolyline);
    }
  }

  getPolylineToTime(timestamp: string) {
    return this.polyline.getLocationsElapsedByTimestamp(this.timeAwarePolyline, timestamp)
  }

  getLatestTime() {
    if(this.timeAwarePolyline) {
      let lastI = this.timeAwarePolyline.length - 1;
      return this.timeAwarePolyline[lastI][2]
    } else {
      return null;
    }
  }

  isNewPolyline(encodedPolyline) {
    return encodedPolyline != this.encodedPolyline;
  }
}