/// <reference types="googlemaps" />
import { IAction, ITrackOption } from "./model";
import { TimeAwareAnim } from "./trace/time-aware-anim";
export declare class TrackAction {
    action: IAction;
    private pk;
    options: ITrackOption;
    map: google.maps.Map;
    anim: TimeAwareAnim;
    actionPoll: any;
    destination: google.maps.Marker;
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
