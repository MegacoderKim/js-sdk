import {TimeAwarePolyline} from "./time-aware-polyline";
import {ISegment, IUserData} from "../model/user";
import * as _ from 'underscore';
import { IPathSegment} from "../model/common";
import {ITimelineEvent} from "../model/event";
import {TimeString} from "ht-js-utils";
import {IDecodedSegment} from "./interface";

export class TimelineReplay extends TimeAwarePolyline {
  // timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
  polyline: L.Polyline = L.polyline([]);
  map;
  stats;
  // timelineSegment = new TimelineSegment();

  debug: boolean = false;

  update(userData: IUserData) {
    this.update(userData);
  };

  debugTimeAwareArray(map) {
    if(this.debug && !map) return false;
    if(map) {
      let path = [];
      console.log("here", map);
      _.each(this.timeAwareArray, (point, i) => {
        // console.log(point);
        let marker = L.marker([+point[0], +point[1]]);
        path.push(marker.getLatLng());
        marker.bindTooltip(`${TimeString(point[2]+'')}: ${point[2]}`);
        if(i < 300) marker.addTo(map)
      });
      var p = L.polyline(path);
      p.addTo(map);
      this.debug = true;
    }

  }


  getPositionAtTime(time: string): L.LatLng | null {
    let pathSegment: IPathSegment[] = this.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray, time);
    if(pathSegment && pathSegment.length > 0) {
      let path = _.last(pathSegment).path;
      let point = _.last(path);
      return L.latLng([point[0], point[1]])
    } else {
      return null
    }
  }

  getPositionBearingnAtTime(timePercent: number): {position: number[], bearing: number} {
    if(!this.stats) return null;
    let currentTimeValue = (timePercent * (this.stats.duration) / 100) + new Date(this.stats.start).getTime();
    let time = new Date(currentTimeValue).toISOString();
    // console.log(TimeString(time));
    this.currentTimeEffects(currentTimeValue);
    // if(segment) console.log(segment.type, "segment", TimeString(segment.started_at), TimeString(segment.ended_at));
    var position: any;
    var bearing;
    let pathSegment: IPathSegment[] = this.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray, time);
    if (pathSegment && pathSegment.length > 0) {
      let pathBeaing = _.last(pathSegment);
      let point = _.last(pathBeaing.path);
      position = [point[0], point[1]];
      bearing = pathBeaing.bearing;
      // return [point[0], point[1]]
    } else {
      // return null
    }
    return {position, bearing}

  }

  currentTimeEffects(time) {

  }

  getHeadFromCurrentSegmnet(segment: IDecodedSegment, timePercent) {
    if(segment.timeAwareArray) {
      let time = this.getInterpolatedTime(segment, timePercent);
      // console.log(time, "time");
      return this.getTripPositonBearing(segment.timeAwareArray, time);
    } else {
      return {
        position: [segment.position[1], segment.position[0]],
        bearing: segment.bearing
      }
    }
  }

  getInterpolatedTime(tripSegment: IDecodedSegment, timePercent): string {
    let currentTimeValue = (timePercent * (tripSegment.durationSeg) / 100) + new Date(tripSegment.start).getTime();
    return new Date(currentTimeValue).toISOString()
  }

  getTripPositonBearing(timeAwareArray, time) {
    var position: any;
    var bearing;
    let pathSegment: IPathSegment[] = this.getPolylineSegmentsForLocationsElapsed(timeAwareArray, time);
    console.log("pathSeg");
    if (pathSegment && pathSegment.length > 0) {
      let pathBeaing = _.last(pathSegment);
      let point = _.last(pathBeaing.path);
      position = [point[0], point[1]];
      bearing = pathBeaing.bearing;
      // return [point[0], point[1]]
    } else {
      // return null
    }
    console.log("position trio");
    return {position, bearing}
  }

  getLastPositionBearing() {
    return this.getPositionBearingnAtTime(100)
  }

  getLocationsAtTimesT(times: string[]) {
    return this.getLocationsAtTimes(this.timeAwareArray, times);
  }


  getBounds(bounds: L.LatLngBounds = L.latLngBounds([])) {
    return _.reduce(this.timeAwareArray, (bounds, point) => {
      return bounds.extend([+point[0], +point[1]])
    }, bounds)
  }

  private getNoTrackingSegments(events: ITimelineEvent[]) {
    return _.reduce(events, (acc: {segments: string[][], start: string}, event: ITimelineEvent) => {
      if(acc.start && event.type == 'tracking.started') {
        return {
          segments: [...acc.segments, [acc.start, event.recorded_at]],
          start: ''
        }
      } else if(event.type == 'tracking.ended') {
        return {...acc, start: event.recorded_at}
      }
      return acc
    }, {
      segments: [],
      start: ""
    }).segments
  }
}

// export interface Stats {
//   duration: number,
//   start: number,
// }

// export interface IDecodedSegment extends  Partial<ISegment> {
//   startPercent: number,
//   endPercent: number,
//   timeAwareArray?: ITimeAwarePoint[],
//   start?: number,
//   end?: number,
//   bearing?: number,
//   position?: number[],
//   durationSeg: number,
//   pstart?: string,
//   pend?: string
// }
