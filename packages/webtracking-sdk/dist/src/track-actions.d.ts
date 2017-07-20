/// <reference types="googlemaps" />
import { IAction, ITrackActionResults, ITrackActions, ITrackingOptions } from "./model";
export declare class HTTrackActions {
    private identifier;
    private identifierType;
    private pk;
    private options;
    trackActions: ITrackActions;
    map: google.maps.Map;
    actionPoll: any;
    constructor(identifier: string, identifierType: string, pk: string, options: ITrackingOptions);
    private renderMap(actions);
    private getActionsFromIdentifier(identifier, identifierType, cb);
    private getFetchActionsUrl(identifier, identifierType);
    pollActionsFromIdentifier(identifier: string, identifierType: string): void;
    trackActionsOnMap(actions: IAction[]): void;
    initTracking(data: ITrackActionResults, identifier: string, identifierType: string): void;
}
export declare function trackActions(identifier: string, identifierType: string, pk: string, options: ITrackingOptions): HTTrackActions;
