/// <reference types="googlemaps" />
/// <reference types="jquery" />
import { IPlace } from "./model";
export declare const GetBaseUrl: (env?: string) => string;
export declare function GetReqOpt(pk: string): {
    headers: {
        "authorization": string;
        "content-type": string;
    };
};
export declare function GetLatLng(place: IPlace | any, key?: string): google.maps.LatLng;
export declare function FetchAction(actionId: string, pk: string): JQueryXHR;
export declare function SetMap(item: any, map: any): void;
