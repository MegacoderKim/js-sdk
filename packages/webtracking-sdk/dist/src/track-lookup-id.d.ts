/// <reference types="googlemaps" />
import { IAction, ITrackActionResults, ITrackActions, ITrackingOptions } from "./model";
import { TrackAction } from "./track-action";
export declare class TrackLookupId {
    lookupId: string;
    pk: string;
    options: ITrackingOptions;
    trackAction: TrackAction;
    trackActions: ITrackActions;
    map: google.maps.Map;
    actionPoll: any;
    constructor(lookupId: string, pk: string, options: ITrackingOptions);
    private renderMap();
    private getDefaultGMapsStyle();
    private getActionsFromLookupId(lookupId, cb);
    pollActionsFromLookupId(lookupId: string): void;
    initTracking(data: ITrackActionResults): void;
    trackActionsOnMap(actions: IAction[]): void;
}
export declare function trackLookupId(shortCode: string, pk: string, options: any): TrackLookupId;
