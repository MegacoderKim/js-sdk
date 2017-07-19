/// <reference types="googlemaps" />
import { IAction, ITrackOption } from "./model";
import { CustomRichMarker } from "./trace/custom-marker";
import Polyline = google.maps.Polyline;
import { TimeAwareAnimation } from "./trace/time-aware-anim.new";
export declare class TrackActionOnMap {
    private action;
    private map;
    private options;
    startMarker: CustomRichMarker;
    endMarker: CustomRichMarker;
    destinationMarker: CustomRichMarker;
    mapPolyline: Polyline;
    timeAwareAnimation: TimeAwareAnimation;
    constructor(action: IAction, map: google.maps.Map, options: ITrackOption);
    private initializeOnMap(action?);
    private renderSummary(action?, bottomPadding?);
    private renderLive(action?);
    private renderEncodedPolyline(action);
    private renderStartMarker(action?);
    private renderEndMarker(action?);
    private renderDestinationMarker(action?);
    private clearLiveView();
    private fitToBounds(latLngPoints, bottomPadding);
    private fitToBoundsWithBottomPadding(latLngs, bottomPadding);
    private latLngBottomOffset(latLng, offset);
    private extendBoundsWithBottomOffset(bounds, yOffset);
    resetBounds(bottomPadding?: number): void;
    update(action: IAction): void;
}
export declare function trackActionOnMap(action: IAction, map: google.maps.Map, options: ITrackOption): TrackActionOnMap;
