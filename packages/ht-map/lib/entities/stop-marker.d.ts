/// <reference types="googlemaps" />
/// <reference types="leaflet" />
import { HtMarkerItem } from "../marker-item";
export declare class HtStopMarker extends HtMarkerItem {
    leafletStyle: {
        radius: number;
        fillColor: any;
        fillOpacity: number;
        weight: number;
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
    getPosition(item: any): L.LatLng | google.maps.LatLng;
}
