import {ISegment, IEvent, IAction} from "ht-models";
import {ITimeAwarePoint, Partial} from "../../models/src/common";

export interface IActionPositions {
  position: HtPosition | null,
  expectedPosition: HtPosition | null,
  completedPosition: HtPosition | null,
  isAwayFromExpected: boolean,
  hasEnded: boolean
}

export interface ISegmentType {
  tripSegment: ISegment[],
  stopSegment: ISegment[]
};

export interface HtPosition {
  lat: number,
  lng: number
}

export interface IPlacelineSegment extends Partial<IProcSegment> {
  segmentId: string,
  placelineTime: string,
  isLast?: boolean,
  isLive?: boolean
}

export interface IProcSegment extends IActivitySegment, Partial<IActionMark>, Partial<IEventMark> {
  segmentId: string
}

export interface ISegmentStyle {
  activityClass: string,
  activityBg: string,
  activityBorder: string,
  activityColor: string,
}

export interface IActivitySegment extends ISegmentStyle{
  activityText: string,
  activityAddress?: string,
  segmentId: string,
  placelineTime: string,
  segment: ISegment,
  start?: number,
  end?: number | null,
  timeAwareArray?: ITimeAwarePoint,
}

export interface IReplaySegment {
  startPercent: number,
  endPercent: number,
  bearing?: number,
}

export interface IActionMark {
  actionText: string,
  actionAddress?: string,
  actionTime?: string,
  action: IAction,
  actionDot: string
  isDone: boolean
  isEnd: boolean
}

export interface IEventMark{
  display: IEventDisplay,
  event: IEvent
}

export interface IEventDisplay {
  text: string,
  subText?: string,
}