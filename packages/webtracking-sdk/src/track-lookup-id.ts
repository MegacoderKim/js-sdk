import * as $ from "jquery";
import {GetBaseUrl, GetReqOpt} from "./helpers";
import {IAction, IDecoded, ITrackActionResult, ITrackActionResults, ITrackOption} from "./model";
import {TrackAction} from "./track-action";

export class TrackLookupId {
  trackAction: TrackAction = new TrackAction();
  constructor(public lookupId: string, public pk: string, public options) {
    this.getActionsFromLookupId(lookupId, (data) => {
      this.initTracking(data)
    });

  }

  private getActionsFromLookupId(lookupId: string, cb) {
    $.ajax({
      url: `${GetBaseUrl()}actions/track/?lookup_id=${lookupId}`,
      ...GetReqOpt(this.pk)
    }).then((data: ITrackActionResults) => {
      cb(data)
    }, err => {
      this.options.onError && this.options.onError(err)
    })
  }

  initTracking(data: ITrackActionResults) {
    let actions: IAction[] = data.results.map((result: ITrackActionResult) => {
      return result.actions[0];
    });
    // let options = this.checkNextActionCallback(this.options);
    actions.forEach((action: IAction) => {
      let trackAction: TrackAction = new TrackAction();
      trackAction.init(action, this.pk, this.options)
    });
    // this.trackAction.init(data.action, this.pk, options);
  }

  private handleNextAction(data) {
    if(window) window.location.reload();
    this.initTracking(data)
  }
}

export function trackLookupId (shortCode: string, pk: string, options) {
  return new TrackLookupId(shortCode, pk, options)
}