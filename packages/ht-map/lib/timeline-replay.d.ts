/// <reference types="leaflet" />
import { TimeAwarePolyline } from "./time-aware-polyline";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/takeUntil";
import { IReplayHead, IReplayPlayer, IReplayStats } from "./interfaces";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
export declare class TimelineReplay extends TimeAwarePolyline {
    map: any;
    stats: any;
    stats$: BehaviorSubject<any>;
    head: any;
    head$: BehaviorSubject<any>;
    playerSub: any;
    player$: BehaviorSubject<IReplayPlayer>;
    player: IReplayPlayer;
    debug: boolean;
    frameInterval: number;
    skipStops: boolean;
    constructor();
    addListerner(): void;
    getPositionBearingnAtTime(time: string): {
        position: number[];
        bearing: number;
    };
    setStats(stats: IReplayStats | null): void;
    setReplayHead(head: IReplayHead | null): void;
    getReplayStats(): Observable<any>;
    getReplayHead(): Observable<any>;
    currentTimeEffects(time: any): void;
    currentSegmentEffects(segment: any): void;
    getLastPositionBearing(): {
        position: number[];
        bearing: number;
    };
    getLocationsAtTimesT(times: string[]): any;
    getBounds(bounds?: L.LatLngBounds): any;
    private getNoTrackingSegments(events);
    goToTimePercent(timePercent: number, toPause?: boolean): void;
    jumpToTimePercent(timePercent: number): void;
    private getNextTimePercent(head);
    private getIncTimePercent(head);
    private getTimeFromTimePercent(timePercent);
    jumpToTime(time: string, timePercent: any): void;
    goToTime(time: string, timePercent: any): void;
    clear(): void;
    play(): void;
    toggleSkipStops(): void;
    pause(): void;
    stop(): void;
    setSpeed(speed: number): void;
    setPlayer(obj: Partial<IReplayPlayer>): void;
}
