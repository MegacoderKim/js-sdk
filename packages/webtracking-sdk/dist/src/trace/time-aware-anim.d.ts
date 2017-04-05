/// <reference types="googlemaps" />
import { TimeAwarePolyline } from "./time-aware-polyline";
import { IAction } from "../model";
export declare class TimeAwareAnim {
    timeAwarePolyline: TimeAwarePolyline;
    map: google.maps.Map;
    marker: google.maps.Marker;
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
    private startAnimPoll();
    show(map: google.maps.Map): void;
    hide(): void;
    clear(): void;
    private getTimeToAdd();
    private setMarker(user, bearing, vehicleType);
    private setColor(action);
    private currentPolylineData();
    private capTime(callback?);
    private clearAnimPoll();
    getBounds(bounds?: google.maps.LatLngBounds): google.maps.LatLngBounds;
}
