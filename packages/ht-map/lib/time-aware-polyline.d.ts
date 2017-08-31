import { IPathSegment, ITimeAwarePoint } from "ht-models";
export declare class TimeAwarePolyline {
    timeAwareArray: ITimeAwarePoint[];
    constructor();
    decode(encodedPolyline: any): ITimeAwarePoint[];
    getPolylineSegmentsForLocationsElapsed(timeAwarePolyline: ITimeAwarePoint[], time: string): IPathSegment[];
    getPolylineSegmentForLocationsElapsed(timeAwarePolyline: ITimeAwarePoint[], time: string): IPathSegment[];
    getLocationsAtTimes(timeAwarePolyline: ITimeAwarePoint[], times: string[]): any;
}
