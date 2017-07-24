import {HTTrackActions} from "./track-actions";

export class TrackActionId {
    trackActions: HTTrackActions;
    constructor(public actionId: string, public pk: string, public options) {}

  public init() {
    this.trackActions = new HTTrackActions(this.actionId, 'actionId', this.pk, this.options);
    return this.trackActions;
  }
}

export function trackActionId (actionId: string, pk: string, options) {
  let trackActionId = new TrackActionId(actionId, pk, options);
  return trackActionId.init();
}