/// <reference types="googlemaps" />
import { TimeAwarePolyline } from "./time-aware-polyline";
import { IAction } from "../model";
import { UserMarker } from "./user-marker";
export declare class TimeAwareAnim {
    timeAwarePolyline: TimeAwarePolyline;
    map: google.maps.Map;
    customVehicleIcon: CustomVehicleIcon | null;
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
    setCustomVehicleIcon(customVehicleIcon: any): void;
    update(action: IAction): void;
    private startAnim();
    private startAnimPoll(action);
    show(map: google.maps.Map): void;
    hide(): void;
    clear(): void;
    private getTimeToAdd();
    private getVehicleAssetDetails(action);
    private setUserMarkerContent(bearing, action);
    private setColor(action);
    private currentPolylineData();
    private capTime(callback?);
    private clearAnimPoll();
    getBounds(bounds?: google.maps.LatLngBounds): google.maps.LatLngBounds;
    getPosition(): any;
}
export interface CustomVehicleIcon {
    src: string;
    height: string;
}
