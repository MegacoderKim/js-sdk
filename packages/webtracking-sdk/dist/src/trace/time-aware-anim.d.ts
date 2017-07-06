/// <reference types="googlemaps" />
import { TimeAwarePolyline } from "./time-aware-polyline";
import { IAction } from "../model";
import { UserMarker } from "./user-marker";
export declare class TimeAwareAnim {
    timeAwarePolyline: TimeAwarePolyline;
    map: google.maps.Map;
    userMarker: UserMarker;
    started: boolean;
    polyline: google.maps.Polyline;
    currentTime: string;
    animPoll: any;
    animSpeed: number;
    animProps: {
        speedScale: number;
        interval: number;
    };
    positionUpdateCallback: any;
    action: IAction;
    polylineOption: google.maps.PolygonOptions | null;
    constructor(polylineOpt?: google.maps.PolygonOptions);
    start(action: IAction, map: google.maps.Map): void;
    update(action: IAction): void;
    private startAnim();
    private startAnimPoll(action);
    show(map: google.maps.Map): void;
    hide(): void;
    clear(): void;
    private getTimeToAdd();
    private getVehicleType(action);
    private setMarker(bearing, action);
    private setColor(action);
    private currentPolylineData();
    private capTime(callback?);
    private clearAnimPoll();
    getBounds(bounds?: google.maps.LatLngBounds): google.maps.LatLngBounds;
    getPosition(): any;
}
