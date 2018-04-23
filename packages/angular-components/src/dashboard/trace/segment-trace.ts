// import {htAction} from "ht-data";
// import {IAction} from "ht-models";
// import * as _ from "underscore";
// import { StopMarkersTrace} from "ht-maps";
// import {TimelineSegment} from "./ht-js-map/timeline-segment";
// import {IPlaceline, ITimelineEvent, IUserPlaceline} from "ht-models";
// import {Color} from "ht-utility";
//
// export class SegmentsTrace {
//   timelineSegment =  new TimelineSegment();
//
//   private getSegmentTypes(userSegments: IPlaceline[]) {
//     return _.reduce(userSegments, (segmentType: ISegmentType, segment: IPlaceline) => {
//       if(segment.type == 'stop') {
//         if(segment.place && segment.place.location) segmentType.stopSegment.push(segment)
//       } else {
//         if(segment.route) segmentType.tripSegment.push(segment)
//       }
//       return segmentType;
//     }, {tripSegment: [], stopSegment: []});
//   }
//
//
//   //segments replay
//   clearTimeline() {
//     this.timelineSegment.clearTimeline()
//   }
//
//   get stats() {
//     return this.timelineSegment.stats
//   }
//
//   // get segments() {
//   //   return this.timelineSegment.placeline
//   // }
//
//   updateTimeline(user: IUserPlaceline) {
//     this.timelineSegment.update(user)
//   }
//
//
//   setSegmentPlayCallback(cb) {
//     this.timelineSegment.playSegmentCallback = cb
//   }
//
//
//
// }
//
// const AllowedEvents = {
//   'tracking.started': 'Tracking started',
//   'tracking.ended': 'Tracking ended',
//   'user.speeding': 'User is speeding',
//   'user.stuck_in_traffic': 'User is stuck in traffic',
//   'user.walking': 'User is walking',
//   'device.location.disabled': 'Location disabled',
//   'device.location.enabled': 'Location enabled',
//   'device.location_permission.disabled': 'Location permission disabled',
//   'device.location_permission.enabled': 'Location permission enabled',
//   'action.assigned': 'Action assigned',
//   'action.delayed': 'Action delayed',
// };
//
//
// interface ISegmentType {
//   tripSegment: IPlaceline[],
//   stopSegment: IPlaceline[]
// };
