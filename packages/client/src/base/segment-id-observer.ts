import {DataObserver} from "./data-observer";
import {PlacelineSegmentId} from "../interfaces";

export class SegmentIdObserver extends DataObserver<PlacelineSegmentId> {
  name = 'segment id';

  setSegmentId(segmentId: string | null) {
    this.data$().take(1).subscribe((placelineSegmentId) => {
      if(!placelineSegmentId.selectedSegmentId) {
        let placelineSegmentId: PlacelineSegmentId = {selectedId: segmentId};
        this.updateData(placelineSegmentId)
      }
    })
  }

  setSelectedSegmentId(segmentId: string | null) {
    let placelineSegmentId: PlacelineSegmentId = {resetBoundsId: segmentId};
    this.updateData(placelineSegmentId)
  }

  setHighlightedSegmentId(segmentId: string | null) {
    let placelineSegmentId: PlacelineSegmentId = {highlightedId: segmentId};

  }

  clearSelectedSegmentId() {
    let placelineSegmentId = {};
    this.updateData({})
  }
}