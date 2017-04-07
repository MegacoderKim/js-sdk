/// <reference types="googlemaps" />
import { IAction, ITrackOption } from "./model";
import { TimeAwareAnim } from "./trace/time-aware-anim";
import { Destination } from "./trace/destination";
export declare class TrackAction {
    action: IAction;
    private pk;
    options: ITrackOption;
    map: google.maps.Map;
    anim: TimeAwareAnim;
    actionPoll: any;
    destination: Destination;
    constructor(action: IAction, pk: string, options: ITrackOption);
    resetBounds(): void;
    private renderMap();
    private getFirstOrigin();
    private makeMap();
    private trace();
    private startActionPoll();
    private fetchAction();
    private updateAction(action);
    private traceDestination();
    private showSummary();
    private clear();
    private drawAndFitPolyline(polylineEncoded);
    private fitPolyline(polylineMvc);
    private fitExtended(polylineMvc);
    private extendedLocation(position, y);
}
export declare function trackAction(action: IAction, pk: string, options: ITrackOption): TrackAction;
