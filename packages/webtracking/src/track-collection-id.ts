import {HTTrackActions} from "./track-actions";

export class TrackCollectionId {
  trackActions: HTTrackActions;
  constructor(private collectionId: string, private pk: string, private options = {}) {}

  public init() {
    this.trackActions = new HTTrackActions(this.collectionId, 'collectionId', this.pk, this.options);
    return this.trackActions;
  }
}

export function trackCollectionId (lookupId: string, pk: string, options = {}) {
  let trackCollection = new TrackCollectionId(lookupId, pk, options);
  return trackCollection.init();
}