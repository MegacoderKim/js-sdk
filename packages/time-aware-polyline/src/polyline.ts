import { TimeAwarePolyline } from "./time-aware";

export class PolylineUtils {
  encodedPolyline: string;
  timeAwarePolyline: Array<Array<any>>;
  timeAware = new TimeAwarePolyline();
  constructor() {

  }

  updateTimeAwarePolyline(encodedPolyline) {
    if(this.isNewPolyline(encodedPolyline)) {
      this.encodedPolyline = encodedPolyline;
      this.timeAwarePolyline = this.timeAware.decodeTimeAwarePolyline(this.encodedPolyline);
    }
  }

  getPolylineToTime(timestamp: string) {
    return this.timeAware.getLocationsElapsedByTimestamp(this.timeAwarePolyline, timestamp)
  }

  getLatestTime() {
    if(this.timeAwarePolyline) {
      let lastI = this.timeAwarePolyline.length - 1;
      return lastI > -1 ? this.timeAwarePolyline[lastI][2] : null
    } else {
      return null;
    }
  }

  isNewPolyline(encodedPolyline) {
    return encodedPolyline != this.encodedPolyline;
  }
}