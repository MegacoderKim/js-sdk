import { HTTrackActions } from "./track-actions";
export declare class TrackLookupId {
    private lookupId;
    private pk;
    private options;
    trackActions: HTTrackActions;
    constructor(lookupId: string, pk: string, options: any);
    init(): HTTrackActions;
}
export declare function trackLookupId(lookupId: string, pk: string, options: any): HTTrackActions;
