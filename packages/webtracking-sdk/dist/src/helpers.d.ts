/// <reference types="googlemaps" />
import { IAction, IMapOptions, IPlace } from "./model";
import LatLng = google.maps.LatLng;
export declare const GetBaseUrl: (env?: string) => string;
export declare function GetReqOpt(pk: string): {
    headers: {
        "authorization": string;
        "content-type": string;
        "X-Hypertrack-Client": string;
    };
};
export declare function GetLatLng(place: IPlace | any, key?: string): LatLng;
export declare function FetchAction(actionId: string, pk: string): any;
export declare function SetMap(item: any, map: any): void;
export declare function RenderGoogleMap(mapId: string, mapOptions: IMapOptions, origin?: LatLng): google.maps.Map;
export declare function GetActionsBounds(actions: IAction[]): google.maps.LatLngBounds;
export declare function addISOTime(time: string, timeToAdd: number): string;
