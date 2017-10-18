import { HTTrackActions } from "./track-actions";
export declare class TrackCollectionId {
    private collectionId;
    private pk;
    private options;
    trackActions: HTTrackActions;
    constructor(collectionId: string, pk: string, options: any);
    init(): HTTrackActions;
}
export declare function trackCollectionId(lookupId: string, pk: string, options: any): HTTrackActions;
