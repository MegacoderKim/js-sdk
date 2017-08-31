/// <reference types="leaflet" />
/// <reference types="googlemaps" />
import { HtMapItem } from "./map-item";
import { HtMap } from "./interfaces";
export declare class HtMarkerItem extends HtMapItem {
    update(data: any, map: HtMap): void;
    getPosition(item: any): L.LatLng | google.maps.LatLng;
}
