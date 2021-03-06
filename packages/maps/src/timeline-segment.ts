// import { TimelineReplay } from "./timeline-replay";
// import * as _ from "underscore";
// import { IDecodedSegment, IReplayHead } from "./interfaces";
// import { Partial } from "ht-models";
//
// export class TimelineSegment extends TimelineReplay {
//   segments: IDecodedSegment[];
//   allSegments: IDecodedSegment[];
//   duration: number;
//   playSegmentCallback;
//
//   update(userData: any) {
//     let segments = userData.segments;
//     // let noTrackingSegments = this.getNoTrackingSegments(userData.events);
//     // console.log(noTrackingSegments);
//     let lastUpdated = userData.last_heartbeat_at;
//     lastUpdated = lastUpdated || new Date().toISOString();
//     let duration = 0;
//     var totalTimeAwareArray = [];
//     this.allSegments = _.reduce(
//       segments,
//       (acc: IDecodedSegment[], segment: IDecodedSegment, i: number) => {
//         let segmentLastUpdatedAt =
//           i == segments.length - 1 ? lastUpdated : null;
//         let segmentData = this.getSegmentData(segment, segmentLastUpdatedAt);
//         let currentSegment;
//         let gapSegment;
//         if (segmentData) {
//           duration = duration + segmentData.durationSeg;
//           totalTimeAwareArray = [
//             ...totalTimeAwareArray,
//             ...segmentData.timeAwareArray
//           ];
//           currentSegment = { ...segment, ...segmentData };
//         }
//         gapSegment =
//           acc.length && currentSegment
//             ? this.getGapSegment(currentSegment, _.last(acc))
//             : null;
//         if (gapSegment) {
//           let gapSegmentData = this.getSegmentData(
//             gapSegment,
//             segmentLastUpdatedAt
//           );
//           duration = duration + gapSegmentData.durationSeg;
//           gapSegment = { ...gapSegment, ...gapSegmentData };
//         }
//         acc = gapSegment ? [...acc, gapSegment] : acc;
//         acc = currentSegment ? [...acc, currentSegment] : acc;
//         return acc;
//       },
//       []
//     );
//     this.timeAwareArray = totalTimeAwareArray;
//     // this.timeAwareArray = _.sortBy(totalTimeAwareArray, (array => {
//     //   let time = new Date(array[2]).getTime();
//     //   return Math.floor(time / 60000)
//     // }));
//     //sorting messes up stop end and trip start points.
//     this.duration = duration;
//     this.segments = this.getSegmentsWithPercentMarks(
//       this.allSegments,
//       duration
//     );
//     let stats = this.getStats(this.segments);
//     this.setStats(stats);
//     // console.log(this.segments, "deco");
//   }
//
//   currentTimeEffects(time) {}
//
//   currentSegmentEffects(currentSegment) {
//     if (this.playSegmentCallback) {
//       let segment = currentSegment;
//       let segmentId = segment ? segment.id : "";
//       this.playSegmentCallback(segmentId);
//     }
//   }
//
//   private getCurrentSegment(time: string) {
//     let timeStamp = new Date(time).getTime();
//     return _.find(this.segments, segment => {
//       return segment.start <= timeStamp && segment.end > timeStamp;
//     });
//   }
//
//   private getSegmentsWithPercentMarks(segments, duration): IDecodedSegment[] {
//     segments = _.reduce(
//       segments,
//       (acc, segment: IDecodedSegment) => {
//         let startPercent = acc.pStart;
//         let segPercent = segment.durationSeg / duration * 100;
//         let endPercent = Math.min(startPercent + segPercent, 100);
//         let filledSegment = {
//           ...segment,
//           startPercent,
//           endPercent
//         };
//
//         return {
//           segments: [...acc.segments, filledSegment],
//           pStart: endPercent,
//           bearing: 0
//         };
//       },
//       { segments: [], pStart: 0, bearing: 0 }
//     ).segments;
//     return segments;
//   }
//
//   private getTripTimeAwareArray(segment: Partial<IDecodedSegment>, segmentEnd) {
//     let timeAwareArray = [];
//     // if(segment.start_location && segment.start_location.geojson && segment.started_at) {
//     //   let startCord = segment.start_location.geojson.coordinates;
//     //   timeAwareArray.push([startCord[1], startCord[0], segment.started_at])
//     // }
//     if (segment.time_aware_polyline) {
//       timeAwareArray.push(...this.decode(segment.time_aware_polyline));
//     } else if (segmentEnd) {
//       let lastPoint = _.last(timeAwareArray);
//       if (lastPoint)
//         timeAwareArray.push([lastPoint[0], lastPoint[1], segmentEnd]);
//     }
//     return timeAwareArray;
//   }
//
//   private getStopTimeAwareArray(segment: Partial<IDecodedSegment>, segmentEnd) {
//     let timeAwareArray = [];
//     let coord =
//       segment.location && segment.location.geojson
//         ? segment.location.geojson.coordinates
//         : null;
//     if (coord) {
//       let position = [coord[1], coord[0]];
//       timeAwareArray = [
//         [...position, segment.started_at],
//         [...position, segmentEnd]
//       ];
//     }
//     return timeAwareArray;
//   }
//
//   private getStats(segments: IDecodedSegment[]) {
//     if (segments.length) {
//       let lastSeg = _.last(segments);
//       let start = segments[0].start;
//       let end = lastSeg.end;
//       //todo duration as sum of segments
//       let stats = {
//         start: new Date(start).toISOString(),
//         end: new Date(end).toISOString(),
//         duration: end - start,
//         distance: 0,
//         timeAwarePolylineArray: this.timeAwareArray,
//         segments
//       };
//       return stats;
//     }
//     return null;
//   }
//
//   private getSegmentData(
//     segment: Partial<IDecodedSegment>,
//     lastUpdatedAt
//   ): Partial<IDecodedSegment> | null {
//     let segmentEnd = segment.ended_at || lastUpdatedAt;
//     let segmentStart = segment.started_at;
//     if (!segmentEnd || !segmentStart) return null;
//     let end = new Date(segmentEnd).getTime();
//     let start = new Date(segmentStart).getTime();
//     let durationSeg = end - start;
//     let timeAwareArray;
//     if (segment.type == "trip") {
//       timeAwareArray = this.getTripTimeAwareArray(segment, segmentEnd);
//     } else if (!segment.timeAwareArray) {
//       timeAwareArray = this.getStopTimeAwareArray(segment, segmentEnd);
//     }
//     return {
//       timeAwareArray,
//       end,
//       start,
//       durationSeg
//     };
//   }
//
//   private getGapSegment(segment: IDecodedSegment, segment2: IDecodedSegment) {
//     // let firstPoint = ;
//     // let lastPoint = _.first(segment.timeAwareArray);
//     let started_at = segment2["ended_at"];
//     let ended_at = segment["started_at"];
//     let timeAwareArray = [];
//     // console.log(firstPoint, lastPoint, "fl");
//     if (started_at && ended_at) {
//       // let started_at = firstPoint[2];
//       // let ended_at =  lastPoint[2];
//
//       return segment.start - segment2.end > 3 * 60000
//         ? {
//             ended_at,
//             started_at,
//             timeAwareArray,
//             type: "gap"
//           }
//         : null;
//     } else {
//       return null;
//     }
//   }
//
//   clearTimeline() {
//     this.clear();
//   }
//
//   goToTime(time: string, timePercent) {
//     //get head and update head$
//     let { position, bearing } = this.getPositionBearingnAtTime(time);
//     let currentSegment = this.getCurrentSegment(time);
//     let head: IReplayHead = {
//       currentTime: time,
//       timePercent,
//       currentPosition: position,
//       bearing,
//       currentSegment,
//       segmentPercent: 0
//     };
//     this.currentSegmentEffects(currentSegment);
//     this.currentTimeEffects(time);
//     this.setReplayHead(head);
//   }
// }
