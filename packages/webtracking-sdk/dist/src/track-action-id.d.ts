import { TrackAction } from "./track-action";
export declare class TrackActionId {
    actionId: string;
    pk: string;
    options: any;
    trackAction: TrackAction;
    constructor(actionId: string, pk: string, options: any);
    private getActionFromId(actionId);
}
export declare function trackActionId(actionId: string, pk: string, options: any): TrackAction;
