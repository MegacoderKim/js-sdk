/// <reference types="googlemaps" />
import { IAction, ITrackActionResults, ITrackedActions, ITrackedData, ITrackingOptions } from "./model";
export declare class HTTrackActions {
    private identifier;
    private identifierType;
    private pk;
    private options;
    trackActions: ITrackedActions;
    trackMultipleData: ITrackedData;
    map: google.maps.Map;
    pollActionsTimeoutId: any;
    constructor(identifier: string, identifierType: string, pk: string, options: ITrackingOptions);
    initTracking(data: ITrackActionResults, identifier: string, identifierType: string): void;
    extractActionsFromResult(data: ITrackActionResults): IAction[];
    renderMap(actions: any): void;
    fetchActionsFromIdentifier(identifier: string, identifierType: string, cb: any): void;
    fetchSubaccountFromIdentifier(identifier: string, identifierType: string, cb: any): void;
    pollActionsFromIdentifier(identifier: string, identifierType: string): void;
    trackActionsOnMap(actions: IAction[]): void;
    getTrackActionsURL(identifier: string, identifierType: string): string;
    getSubaccountFromIdentifierURL(identifier: string, identifierType: string): string;
}
export declare function trackActions(identifier: string, identifierType: string, pk: string, options: ITrackingOptions): HTTrackActions;
