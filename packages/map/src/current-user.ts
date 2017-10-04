import {HtMapItem} from "./map-item";
import {TimelineSegment} from "./timeline-segment";
import {HtMarkerItem} from "./marker-item";
import {IUser, IUserAnalytics} from "ht-models";

export class HtCurrentUser extends HtMarkerItem<IUser | IUserAnalytics> {
  timelineSegment;

  getCurrentPosition() {

  }

}