import { HTTrackActions } from "./track-actions";
export declare class TrackShortCode {
    shortCode: string;
    pk: string;
    options: any;
    trackActions: HTTrackActions;
    constructor(shortCode: string, pk: string, options: any);
    init(): HTTrackActions;
}
export declare function trackShortCode(shortCode: string, pk: string, options: any): HTTrackActions;
