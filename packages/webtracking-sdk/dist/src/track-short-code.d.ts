import { TrackAction } from "./track-action";
export declare class TrackShortCode {
    shortCode: string;
    pk: string;
    options: any;
    trackAction: TrackAction;
    constructor(shortCode: string, pk: string, options: any);
    private getActionFromShortCode(shortCode);
}
export declare function trackShortCode(shortCode: string, pk: string, options: any): TrackShortCode;
