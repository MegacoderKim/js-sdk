import {ISegment} from "ht-models";

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