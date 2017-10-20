import {MapUtils} from "../interfaces";
import {MapEntities} from "./interfaces";
import {Color} from "ht-js-utils";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {polylineRenderConfigFactory} from "../helpers/polyline-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {MapService} from "../map-service";
import {mapItemsFactory} from "../base/map-items-factory";


export const segmentFactory = (): MapEntities<any> => {
  let stylesObj = {
    google: {
      default: {
        strokeColor: Color.blue,
        strokeOpacity: 1,
        strokeWeight: 5
      }
    },
    leaflet: {
      default: {

      }
    }
  };
  let stop = dataFactory({
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  });
  let name = 'segment';
  let segments = mapItemsFactory({isPolyline: true, stylesObj, data: stop, name});
  return segments;
};