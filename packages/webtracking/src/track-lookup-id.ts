import {HTTrackActions} from "./track-actions";

export class TrackLookupId {
  trackActions: HTTrackActions;
  constructor(private lookupId: string, private pk: string, private options) {}

  public init() {
    this.trackActions = new HTTrackActions(this.lookupId, 'lookupId', this.pk, this.options);
    return this.trackActions;
  }
}

export function trackLookupId (lookupId: string, pk: string, options) {
  let trackLookupId = new TrackLookupId(lookupId, pk, options);
  return trackLookupId.init()
}