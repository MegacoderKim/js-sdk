/// <reference types="googlemaps" />
import { IMapOptions, ITrackingData } from "./model";
import { CustomRichMarker } from "./trace/custom-marker";
import Polyline = google.maps.Polyline;
export declare class TrackData {
    private trackData;
    private map;
    private mapOptions;
    startMarker: CustomRichMarker;
    endMarker: CustomRichMarker;
    destinationMarker: CustomRichMarker;
    userMarker: CustomRichMarker;
    mapPolyline: Polyline;
    private timeAwareAnimation;
    constructor(trackData: ITrackingData, map: google.maps.Map, mapOptions: IMapOptions);
    private getVehicleAssetDetails(data?, mapOptions?);
    private renderSummaryData(encodedTimeAwarePolyline);
    private renderLiveData(encodedTimeAwarePolyline, destination);
    private renderEncodedPolyline(encodedTimeAwarePolyline);
    private renderStartMarker(encodedTimeAwarePolyline);
    private getTimeAwarePolylinePathArray(encodedTimeAwarePolyline);
    private renderEndMarker(encodedTimeAwarePolyline);
    private renderDestinationMarker(destination);
    private clearLiveView();
    private clearSummaryView();
    private fitToBounds(latLngPoints, bottomPadding);
    private fitToBoundsWithBottomPadding(latLngs, bottomPadding);
    private latLngYOffset(latLng, yOffset);
    private extendBoundsWithBottomOffset(bounds, bottomOffset);
    private extendBoundsWithTopOffset(bounds, topOffset);
    resetBounds(bottomPadding?: number, topPadding?: number): void;
    clearMap(): void;
    track(trackData?: ITrackingData, mapOptions?: IMapOptions): void;
}
export declare function trackDataOnMap(data: ITrackingData, map: google.maps.Map, options: IMapOptions): TrackData;
