import {segmentPolylineStyles} from "../styles/segment-polyline-styles";
import {ISegment} from "ht-models";
import {mapItemsFactory} from "../base/map-items-factory";


export class SegmentPolylines {
  styleObj = segmentPolylineStyles;

  getEncodedPath(data) {
    return data.encoded_polyline;
  };

  getEncodedPositionTime(data: ISegment) {
    return data.time_aware_polyline
  }
}

export const SegmentPolylinesTrace = mapItemsFactory(SegmentPolylines, {
  isPolyline: true,
  hasDataObservable: false
});

// export const SegmentPolylinesTrace = _.compose(
//   PolylinesMixin,
//   MarkersMixin,
//   StyleMixin,
//   TraceMixin,
// )(SegmentPolylines);