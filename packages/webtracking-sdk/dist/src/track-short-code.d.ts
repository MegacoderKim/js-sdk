import { IDecoded } from "./model";
import { TrackAction } from "./track-action";
export declare class TrackShortCode {
    shortCode: string;
    pk: string;
    options: any;
    trackAction: TrackAction;
    constructor(shortCode: string, pk: string, options: any);
    private getActionFromShortCode(shortCode, cb);
    initTracking(data: IDecoded): void;
    private checkNextActionCallback(options);
    private handleNextAction(data);
}
export declare function trackShortCode(shortCode: string, pk: string, options: any): TrackAction;
