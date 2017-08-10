/// <reference types="googlemaps" />
import { IAction, IMapOptions } from "./model";
import { CustomRichMarker } from "./trace/custom-marker";
import Polyline = google.maps.Polyline;
export declare class TrackedAction {
    private action;
    private map;
    private mapOptions;
    startMarker: CustomRichMarker;
    endMarker: CustomRichMarker;
    destinationMarker: CustomRichMarker;
    mapPolyline: Polyline;
    userMarker: CustomRichMarker;
    private timeAwareAnimation;
    constructor(action: IAction, map: google.maps.Map, mapOptions: IMapOptions);
    showOnMap(action?: IAction): void;
    private renderSummary(action?);
    private renderLive(action?);
    private renderEncodedPolyline(action);
    private renderStartMarker(action?);
    private renderEndMarker(action?);
    private renderDestinationMarker(action?);
    private clearLiveView();
    private fitToBounds(latLngPoints, bottomPadding);
    private fitToBoundsWithBottomPadding(latLngs, bottomPadding);
    private latLngYOffset(latLng, yOffset);
    private extendBoundsWithBottomOffset(bounds, bottomOffset);
    private extendBoundsWithTopOffset(bounds, topOffset);
    resetBounds(bottomPadding?: number, topPadding?: number): void;
    update(action: IAction): void;
    updateMapOptions(mapOptions: IMapOptions): void;
    hideOnMap(): void;
    updateUserMarkerIcon(icon: string): void;
}
export declare function trackActionOnMap(action: IAction, map: google.maps.Map, options: IMapOptions): TrackedAction;
