import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt} from "./helpers";
import {IAction, IDecoded, ITrackOption} from "./model";
import {TrackAction} from "./track-action";

export class TrackShortCode {
    trackAction: TrackAction = new TrackAction();
    constructor(public shortCode: string, public pk: string, public options) {
        this.getActionFromShortCode(shortCode, (data) => {
            this.initTracking(data)
        });

    }

    private getActionFromShortCode(shortCode: string, cb) {
        $.ajax({
            url: `${GetBaseUrl()}decoder/${shortCode}/`,
            ...GetReqOpt(this.pk)
        }).then((data: IDecoded) => {
            cb(data)
        }, err => {
            this.options.onError && this.options.onError(err)
        })
    }

    initTracking(data: IDecoded) {
        let options = this.checkNextActionCallback(this.options);
        this.trackAction.init(data.action, this.pk, options);
        this.options.onAccountReady && this.options.onAccountReady(data.sub_account, data.action);
    }

    private checkNextActionCallback(options: ITrackOption) {
        let onActionUpdate = (action: IAction) => {
            if(action.display.show_summary) {
                setTimeout(() => {
                    this.getActionFromShortCode(this.shortCode, (data) => {
                        if(data.action.id != action.id) {
                            this.handleNextAction(data)
                        }
                    })
                }, 30000)
            }
            options.onActionUpdate(action)
        };
        return {...options, onActionUpdate}

    }

    private handleNextAction(data) {
        if(window) window.location.reload();
        this.initTracking(data)
    }
}

export function trackShortCode (shortCode: string, pk: string, options) {
    return new TrackShortCode(shortCode, pk, options).trackAction
}