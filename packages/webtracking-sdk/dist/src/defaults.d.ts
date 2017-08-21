/// <reference types="googlemaps" />
import MapTypeStyle = google.maps.MapTypeStyle;
import { CustomVehicleIcon } from "./model";
export declare const DefaultGMapsStyle: MapTypeStyle[];
export declare const DefaultGoogleMapOptions: {
    zoom: number;
    disableDefaultUI: boolean;
    scrollwheel: boolean;
    scaleControl: boolean;
    clickableIcons: boolean;
    gestureHandling: "greedy";
    center: google.maps.LatLng;
    styles: MapTypeStyle[];
};
export declare const DefaultPolylineOptions: {
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    icons: any[];
};
export declare const DefaultVehicleIcon: CustomVehicleIcon;
