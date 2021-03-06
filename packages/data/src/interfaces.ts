import { IPlaceline, IEvent, IAction, ITimeAwarePoint, Partial, ITimelineEvent, HtPosition } from "ht-models";

export interface IActionPositions {
  position: HtPosition | null;
  expectedPosition: HtPosition | null;
  completedPosition: HtPosition | null;
  isAwayFromExpected: boolean;
  hasEnded: boolean;
}

export interface ISegmentType {
  tripSegment: IPlaceline[];
  stopSegment: IPlaceline[];
}

// export interface HtPosition {
//   lat: number;
//   lng: number;
// }

export interface IPlacelineSegment extends Partial<IProcSegment> {
  segmentId: string;
  placelineTime: string;
  isLast?: boolean;
  isLive?: boolean;
}

export interface IProcSegment
  extends IActivitySegment,
    Partial<IActionMark>,
    Partial<IEventMark> {
  segmentId: string;
}

export interface ISegmentStyle {
  activityClass: string;
  activityBg: string;
  activityBorder: string;
  activityColor: string;
}

export interface IActivitySegment extends ISegmentStyle {
  activityText: string;
  activityAddress?: string;
  segmentId: string;
  placelineTime: string;
  segment: IPlaceline;
  start?: number;
  end?: number | null;
  timeAwareArray?: ITimeAwarePoint;
}

export interface IReplaySegment {
  startPercent: number;
  endPercent: number;
  bearing?: number;
}

export interface IActionMark {
  actionText: string;
  actionAddress?: string;
  actionTime?: string;
  action: IAction;
  actionDot: string;
  isDone: boolean;
  isEnd: boolean;
}

export interface IEventMark {
  display: IEventDisplay;
  event: IEvent | ITimelineEvent;
}

export interface IEventDisplay {
  text: string;
  subText?: string;
}
