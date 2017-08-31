import { TimelineReplay } from "./timeline-replay";
import { IDecodedSegment } from "./interfaces";
export declare class TimelineSegment extends TimelineReplay {
    segments: IDecodedSegment[];
    allSegments: IDecodedSegment[];
    duration: number;
    playSegmentCallback: any;
    update(userData: any): void;
    currentTimeEffects(time: any): void;
    currentSegmentEffects(currentSegment: any): void;
    private getCurrentSegment(time);
    private getSegmentsWithPercentMarks(segments, duration);
    private getTripTimeAwareArray(segment, segmentEnd);
    private getStopTimeAwareArray(segment, segmentEnd);
    private getStats(segments);
    private getSegmentData(segment, lastUpdatedAt);
    private getGapSegment(segment, segment2);
    clearTimeline(): void;
    goToTime(time: string, timePercent: any): void;
}
