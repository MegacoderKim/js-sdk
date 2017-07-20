import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt, RenderGoogleMap} from "./helpers";
import {IAction, IDecoded, ITrackActionResult, ITrackActionResults, ITrackActions, ITrackOption} from "./model";
import {TrackAction} from "./track-action";
import {TrackActionOnMap} from "./track-action.new";
import {DefaultGMapsStyle} from "./defaults";
import {HTTrackActions} from "./track-actions";

export class TrackShortCode {
    trackActions: HTTrackActions;
    constructor(public shortCode: string, public pk: string, public options) {
        new HTTrackActions(shortCode, 'shortCode', pk, options);
    }

    public init() {
        this.trackActions = new HTTrackActions(this.shortCode, 'shortCode', this.pk, this.options);
        return this.trackActions;
    }
}

export function trackShortCode (shortCode: string, pk: string, options) {
    let trackShortCode = new TrackShortCode(shortCode, pk, options);
    return trackShortCode.init()
}