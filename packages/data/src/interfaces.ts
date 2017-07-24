
import {ISegment} from "ht-models/dist";

export interface IActionPositions {
  position: [number, number] | null,
  expectedPosition: [number, number] | null,
  completedPosition: [number, number] | null,
  isAwayFromExpected: boolean,
  hasEnded: boolean
}

export interface ISegmentType {
  tripSegment: ISegment[],
  stopSegment: ISegment[]
};