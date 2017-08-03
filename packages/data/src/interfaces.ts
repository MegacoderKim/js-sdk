
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

export const defaultListConfig: IListConfig = {
  isLive: false,
  autoLive: false
};

export interface IIndexQuery {
  pageQuery: object,
  listQuery: object,
  dateRangeQuery: object
}

export interface IListConfig {
  isLive: boolean,
  autoLive: boolean
}