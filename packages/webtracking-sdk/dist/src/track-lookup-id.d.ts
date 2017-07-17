import { ITrackActionResults } from "./model";
import { TrackAction } from "./track-action";
export declare class TrackLookupId {
    lookupId: string;
    pk: string;
    options: any;
    trackAction: TrackAction;
    constructor(lookupId: string, pk: string, options: any);
    private getActionsFromLookupId(lookupId, cb);
    initTracking(data: ITrackActionResults): void;
    private handleNextAction(data);
}
export declare function trackLookupId(shortCode: string, pk: string, options: any): TrackAction;
