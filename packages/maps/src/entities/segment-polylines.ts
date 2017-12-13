import { segmentPolylineStyles } from "../styles/segment-polyline-styles";
import { ISegment } from "ht-models";
import {
  ItemClassFactoryConfig,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";

export const SegmentPolylinesConfig: ItemClassFactoryConfig = {
  renderConfig: {
    getEncodedPath(data) {
      return data.encoded_polyline;
    },
    getEncodedPositionTime(data: ISegment) {
      return data.time_aware_polyline;
    }
  },
  styleObj: segmentPolylineStyles,
  typeConfig: {
    isPolyline: true,
    hasDataObservable: false
  },
  name: "segment polyline"
};

export const segmentsPolylinesTrace = () => {
  return itemsFactory(SegmentPolylinesConfig);
};

// export class SegmentPolylines {
//   styleObj = segmentPolylineStyles;
//
//   getEncodedPath(data) {
//     return data.encoded_polyline;
//   };
//
//   getEncodedPositionTime(data: ISegment) {
//     return data.time_aware_polyline
//   }
// }
//
// export const SegmentPolylinesTrace = mapItemsFactory(SegmentPolylines, {
//   isPolyline: true,
//   hasDataObservable: false
// });

// export const SegmentPolylinesTrace = _.compose(
//   PolylinesMixin,
//   MarkersMixin,
//   StyleMixin,
//   TraceMixin,
// )(SegmentPolylines);
