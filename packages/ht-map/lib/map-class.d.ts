/// <reference types="leaflet" />
import { HtBounds, HtMap, HtMapType, MapUtils } from "./interfaces";
import { HtSegmentsTrace } from "./segments-trace";
import { IUserData } from "ht-models";
export declare class HtMapClass {
    mapType: HtMapType;
    map: HtMap;
    mapUtils: MapUtils;
    segmentTrace: HtSegmentsTrace;
    leafletSetBoundsOptions: L.PanOptions;
    googleSetBoundsOptions: {};
    constructor(mapType?: HtMapType, options?: {});
    initMap(elem: Element, options?: {}): void;
    tracePlaceline(user: IUserData): void;
    resetBounds(options?: any, bounds?: HtBounds): void;
    setBounds(bounds: HtBounds, options?: any): void;
}
