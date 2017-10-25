import {MapUtils} from "../interfaces";
import {MapEntities} from "./interfaces";
import {Color} from "ht-js-utils";
import {markerRenderConfigFactory} from "../renderers/marker-render";
import {polylineRenderConfigFactory} from "../renderers/polyline-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/trace-factory";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {MapService} from "../map-service";
import {mapItemsFactory} from "../base/map-items-factory";
import {segmentPolylineStyles} from "../map-styles/segment-polyline-styles";


export const segmentFactory = (): MapEntities<any> => {
  let stylesObj = segmentPolylineStyles;
  let stop = dataFactory({
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  });
  let name = 'segment';
  let segments = mapItemsFactory({isPolyline: true, stylesObj, data: stop, name});
  return segments;
};