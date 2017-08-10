/// <reference types="googlemaps" />
import { CustomVehicleIcon } from "../model";
import { TimeAwarePolyline } from "./time-aware-polyline";
import { CustomRichMarker } from "./custom-marker";
export default class UserMarkerAnimation {
    private map;
    private mapPolyline;
    private userMarker;
    private vehicleIcon;
    timeAwarePolyline: TimeAwarePolyline;
    currentTime: string;
    animationPoll: any;
    animationSpeed: number;
    animationProps: {
        speedScale: number;
        interval: number;
    };
    constructor(map: google.maps.Map, mapPolyline?: google.maps.Polyline, userMarker?: CustomRichMarker, vehicleIcon?: CustomVehicleIcon);
    private handleAnimation();
    private updateCurrentTime();
    private renderCurrentTimeMarkerPolyline();
    private setUserMarkerContent(bearing);
    private renderUserMarker(bearing, position);
    private renderPolyline(path, map);
    private getTimeToAdd();
    private capTime(callback?);
    private currentTimePolylineData();
    clearAnimationPoll(): void;
    animate(encodedTimeAwarePolyline: string): void;
}
