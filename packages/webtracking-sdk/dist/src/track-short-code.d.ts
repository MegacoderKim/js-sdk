/// <reference types="googlemaps" />
import { IAction, ITrackActionResults, ITrackActions } from "./model";
import { TrackAction } from "./track-action";
export declare class TrackShortCode {
    shortCode: string;
    pk: string;
    options: any;
    trackAction: TrackAction;
    trackActions: ITrackActions;
    map: google.maps.Map;
    actionPoll: any;
    constructor(shortCode: string, pk: string, options: any);
    private renderMap();
    private getDefaultGMapsStyle();
    private getActionFromShortCode(shortCode, cb);
    pollActionsFromShortcode(shortCode: string): void;
    trackActionsOnMap(actions: IAction[]): void;
    initTracking(data: ITrackActionResults): void;
}
export declare function trackShortCode(shortCode: string, pk: string, options: any): TrackShortCode;
