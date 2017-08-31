/// <reference types="leaflet" />
import { MapUtils } from "./interfaces";
export declare function ExtendBounds(item?: any, bounds?: L.LatLngBounds): L.LatLngBounds;
export declare const ExtendBoundsWithPolyline: (polyline?: L.Polyline, bounds?: L.LatLngBounds) => L.LatLngBounds;
export declare const SetStyle: (item: any, style: any) => void;
export declare const SetMap: (item: any, map: L.Map) => void;
export declare const ClearItem: (item: any) => void;
export declare const GetLatlng: (lat?: number, lng?: number) => L.LatLng;
export declare const setEncodedPath: (polyline: L.Polyline, encodedPolyline: string) => L.Polyline;
export declare function HtUpdatePositionPopup(marker: any, position: any, infoContent: string, defaultOption?: L.PopupOptions): void;
export declare function HtUpdatePopup(marker: any, infoContent: any, defaultOption: any): void;
export declare function HtUpdatePositionTooltip(marker: any, position: any, infoContent?: string, defaultOption?: L.TooltipOptions): void;
export declare function HtUpdateTooltip(marker: any, infoContent: any, defaultOption: any): void;
export declare const LeafletUtils: MapUtils;
