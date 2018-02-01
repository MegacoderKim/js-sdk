import {HTTrackActions} from "./track-actions";

export class TrackShortCode {
    trackActions: HTTrackActions;
    constructor(public shortCode: string, public pk: string, public options) {}

    public init() {
        this.trackActions = new HTTrackActions(this.shortCode, 'shortCode', this.pk, this.options);
        return this.trackActions;
    }
}

export function trackShortCode (shortCode: string, pk: string, options) {
    let trackShortCode = new TrackShortCode(shortCode, pk, options);
    return trackShortCode.init();
}