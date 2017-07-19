/// <reference types="googlemaps" />
import { IAction, ITrackActionResults } from "./model";
import { TrackAction } from "./track-action";
export declare class TrackLookupId {
    lookupId: string;
    pk: string;
    options: any;
    trackAction: TrackAction;
    trackActions: any;
    map: google.maps.Map;
    actionPoll: any;
    constructor(lookupId: string, pk: string, options: any);
    private renderMap();
    private getDefaultGMapsStyle();
    private getActionsFromLookupId(lookupId, cb);
    pollActionsFromLookupId(lookupId: string): void;
    initTracking(data: ITrackActionResults): void;
    trackActionsOnMap(actions: IAction[]): void;
}
export declare function trackLookupId(shortCode: string, pk: string, options: any): TrackLookupId;
