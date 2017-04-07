import * as $ from "jquery";
// var $ = require('jquery');
import {GetBaseUrl, GetReqOpt} from "./helpers";
import {IDecoded} from "./model";
import {TrackAction} from "./track-action";

export class TrackShortCode {
    trackAction: TrackAction;
    constructor(public shortCode: string, public pk: string, public options) {
        this.getActionFromShortCode(shortCode)

    }

    private getActionFromShortCode(shortCode: string) {
        $.ajax({
            url: `${GetBaseUrl()}decoder/${shortCode}`,
            ...GetReqOpt(this.pk)
        }).then((data: IDecoded) => {
            console.log(data);
            this.trackAction = new TrackAction(data.action, this.pk, this.options)
        }, err => {
            this.options.onError && this.options.onError(err)
        })
    }

}

export function trackShortCode (shortCode: string, pk: string, options) {
    return new TrackShortCode(shortCode, pk, options)
}