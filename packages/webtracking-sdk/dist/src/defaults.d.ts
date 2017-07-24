/// <reference types="googlemaps" />
import MapTypeStyle = google.maps.MapTypeStyle;
export declare const DefaultGMapsStyle: MapTypeStyle[];
export declare const DefaultGoogleMapOptions: {
    zoom: number;
    disableDefaultUI: boolean;
    scrollwheel: boolean;
    scaleControl: boolean;
    clickableIcons: boolean;
    center: google.maps.LatLng;
    styles: MapTypeStyle[];
};
export declare const DefaultPolylineOptions: {
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    icons: any[];
};
