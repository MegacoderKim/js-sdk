/// <reference types="googlemaps" />
/// <reference types="leaflet" />
import { HtMarker, MapUtils } from "./interfaces";
export declare function ExtendBounds(item: any, bounds: google.maps.LatLngBounds): google.maps.LatLngBounds;
export declare const ExtendBoundsWithPolyline: (polyline?: google.maps.Polyline, bounds?: google.maps.LatLngBounds) => google.maps.LatLngBounds;
export declare const SetStyle: (item: any, style: any) => void;
export declare const SetMap: (item: any, map: google.maps.Map) => void;
export declare const ClearItem: (item: any) => void;
export declare const GetLatlng: (lat?: number, lng?: number) => google.maps.LatLng;
export declare const setEncodedPath: (polyline: google.maps.Polyline, encodedPolyline: string) => void;
export declare function HtUpdatePositionPopup(marker: any, position: any, infoContent: string, defaultOption?: L.PopupOptions): void;
export declare function HtUpdatePopup(marker: any, infoContent: any, defaultOption: any): void;
export declare function HtUpdatePositionTooltip(marker: any, position: any, infoContent?: string, defaultOption?: L.TooltipOptions): void;
export declare function HtUpdateTooltip(marker: HtMarker, infoContent: any, defaultOption: any): void;
export declare const GoogleMapUtils: MapUtils;
