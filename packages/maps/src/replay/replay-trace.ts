import {htAction} from "ht-data";
import {IAction} from "ht-models";
import * as _ from "underscore";
import {TimelineSegment} from "./timeline-segment";
import {IPlaceline, ITimelineEvent, IUserPlaceline} from "ht-models";
import {Color} from "ht-utility";

export class ReplayTrace {
  timelineSegment =  new TimelineSegment();

  private getSegmentTypes(userSegments: IPlaceline[]) {
    return _.reduce(userSegments, (segmentType: ISegmentType, segment: IPlaceline) => {
      if(segment.type == 'stop') {
        if(segment.place && segment.place.location) segmentType.stopSegment.push(segment)
      } else {
        if(segment.route) segmentType.tripSegment.push(segment)
      }
      return segmentType;
    }, {tripSegment: [], stopSegment: []});
  }


  //segments replay
  clearTimeline() {
    this.timelineSegment.clearTimeline()
  }

  get stats() {
    return this.timelineSegment.stats
  }

  // get segments() {
  //   return this.timelineSegment.placeline
  // }

  updateTimeline(user: IUserPlaceline) {
    this.timelineSegment.update(user)
  }


  setSegmentPlayCallback(cb) {
    this.timelineSegment.playSegmentCallback = cb
  }



}



interface ISegmentType {
  tripSegment: IPlaceline[],
  stopSegment: IPlaceline[]
};
