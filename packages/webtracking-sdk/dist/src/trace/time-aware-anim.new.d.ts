/// <reference types="googlemaps" />
import { IAction, IMapOptions } from "../model";
import { TimeAwarePolyline } from "./time-aware-polyline";
import { CustomRichMarker } from "./custom-marker";
export declare class TimeAwareAnimation {
    private map;
    private action;
    private userMarker;
    private polyline;
    private options;
    timeAwarePolyline: TimeAwarePolyline;
    isAnimationStarted: boolean;
    currentTime: string;
    animationPoll: any;
    animationSpeed: number;
    animationProps: {
        speedScale: number;
        interval: number;
    };
    constructor(map: google.maps.Map, action: IAction, userMarker: CustomRichMarker, polyline: google.maps.Polyline, options?: IMapOptions);
    start(action: IAction): void;
    private handleAnimation(action);
    private updateCurrentTime();
    private renderCurrentTimeMarkerPolyline(action);
    private setUserMarkerContent(bearing, action);
    private renderUserMarker(action, bearing, position);
    private renderPolyline(path, map);
    private getVehicleAssetDetails(action);
    private capTime(callback?);
    clearAnimationPoll(): void;
    private getTimeToAdd();
    private currentTimePolylineData();
    update(action: IAction): void;
    extendBoundsWithUserMarker(bounds?: google.maps.LatLngBounds): google.maps.LatLngBounds;
    getUserMarker(): CustomRichMarker;
    clear(): void;
}
