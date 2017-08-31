/// <reference types="googlemaps" />
/// <reference types="leaflet" />
import { HtMarkerItem } from "../marker-item";
import { IAction } from "ht-models";
export declare class HtActionMarker extends HtMarkerItem {
    leafletSttyle: {
        radius: number;
        fillColor: any;
        fillOpacity: number;
        weight: number;
        opacity: number;
        color: any;
        pane: string;
    };
    googleStyle: {
        icon: {
            fillColor: any;
            fillOpacity: number;
            strokeColor: any;
            strokeOpacity: number;
            path: google.maps.SymbolPath;
            scale: number;
            strokeWeight: number;
        };
    };
    setItem(): void;
    getPosition(data: IAction): L.LatLng | google.maps.LatLng;
}
