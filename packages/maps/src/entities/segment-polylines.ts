import {DataConfig, MapEntities} from "./interfaces";
import {mapItemsFactory} from "../base/map-items-factory";
import {segmentPolylineStyles} from "../styles/segment-polyline-styles";
import {ISegment} from "ht-models";
import * as _ from "underscore";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {TraceMixin} from "../mixins/trace";
import {DataObservableMixin} from "../mixins/data-observable";

export const segmentFactory = (): MapEntities<any> => {
  let stylesObj = segmentPolylineStyles;
  let dataConfig: DataConfig<any> = {
    getEncodedPath(data) {
      return data.encoded_polyline;
    },
    getEncodedPositionTime(data: ISegment) {
      return data.time_aware_polyline
    }
  };
  // let stop = dataFactory({
  //
  // });
  let name = 'segment';
  let segments = mapItemsFactory({isPolyline: true, stylesObj, dataConfig, name});
  return segments;
};

export class SegmentPolylines {
  styleObj = segmentPolylineStyles;

  getEncodedPath(data) {
    return data.encoded_polyline;
  };

  getEncodedPositionTime(data: ISegment) {
    return data.time_aware_polyline
  }
}

export const SegmentPolylinesTrace = _.compose(
  PolylinesMixin,
  MarkersMixin,
  StyleMixin,
  TraceMixin,
)(SegmentPolylines);