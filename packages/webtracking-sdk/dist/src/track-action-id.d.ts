import { HTTrackActions } from "./track-actions";
export declare class TrackActionId {
    actionId: string;
    pk: string;
    options: any;
    trackActions: HTTrackActions;
    constructor(actionId: string, pk: string, options: any);
    init(): HTTrackActions;
}
export declare function trackActionId(actionId: string, pk: string, options: any): HTTrackActions;
