/// <reference types="googlemaps" />
import { IAction } from "../model";
import { TimeAwarePolyline } from "./time-aware-polyline";
import { CustomRichMarker } from "./custom-marker";
export declare class TimeAwareAnimation {
    private map;
    private action;
    private options;
    timeAwarePolyline: TimeAwarePolyline;
    polyline: google.maps.Polyline;
    isAnimationStarted: boolean;
    userMarker: CustomRichMarker;
    currentTime: string;
    animationPoll: any;
    animationSpeed: number;
    animationProps: {
        speedScale: number;
        interval: number;
    };
    constructor(map: google.maps.Map, action: IAction, options?: any);
    start(action: IAction): void;
    private handleAnimation(action);
    private updateCurrentTime();
    private renderCurrentTimeMarkerPolyline(action);
    private setUserMarkerContent(bearing, action);
    private renderUserMarker(action, bearing, position);
    private renderPolyline(path, map);
    private getVehicleAssetDetails(action);
    private capTime(callback?);
    private clearAnimationPoll();
    private getTimeToAdd();
    private currentTimePolylineData();
    update(action: IAction): void;
    extendBoundsWithUserMarker(bounds?: google.maps.LatLngBounds): google.maps.LatLngBounds;
    getUserMarker(): CustomRichMarker;
    clear(): void;
    private startAnimation(action?);
    private startAnimationPoll(action?);
    private setUserMarker(action, bearing, position);
}
