/// <reference types="googlemaps" />
import { IMapOptions, ITrackedData, ITrackingData, ITrackingDataOptions } from "./model";
export declare class TrackByData {
    dataArray: ITrackingData[];
    options: ITrackingDataOptions;
    map: google.maps.Map;
    trackedData: ITrackedData;
    constructor(dataArray: ITrackingData[], options: ITrackingDataOptions);
    renderMap(): void;
    track(dataArray: ITrackingData[], mapOptions?: IMapOptions): void;
}
export declare function trackByData(dataArray: ITrackingData[], options: ITrackingDataOptions): TrackByData;
