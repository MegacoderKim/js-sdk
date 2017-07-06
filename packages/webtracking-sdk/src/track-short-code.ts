import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt} from "./helpers";
import {IDecoded} from "./model";
import {TrackAction} from "./track-action";

export class TrackShortCode {
    trackAction: TrackAction = new TrackAction();
    constructor(public shortCode: string, public pk: string, public options) {
        this.getActionFromShortCode(shortCode)

    }

    private getActionFromShortCode(shortCode: string) {
        $.ajax({
            url: `${GetBaseUrl()}decoder/${shortCode}/`,
            ...GetReqOpt(this.pk)
        }).then((data: IDecoded) => {
            console.log(data);
            this.trackAction.init(data.action, this.pk, this.options);
            this.options.onAccountReady && this.options.onAccountReady(data.sub_account, data.action);
        }, err => {
            this.options.onError && this.options.onError(err)
        })
    }

}

export function trackShortCode (shortCode: string, pk: string, options) {
    return new TrackShortCode(shortCode, pk, options).trackAction
}