import {MapUtils} from "../interfaces";
import {MapEntities} from "./interfaces";
import {Color} from "ht-js-utils";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {polylineRenderConfigFactory} from "../helpers/polyline-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {MapService} from "../map-service";


export const segmentFactory = (): MapEntities<any> => {
  let mapUtils = MapService.mapUtils;
  let state = {
    map: null,
  };
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
  let stylesConfig = stylesConfigFactory(stylesObj, mapUtils.type);
  let renderConfig = markerRenderConfigFactory();
  renderConfig = polylineRenderConfigFactory(renderConfig);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };
  let stop = dataFactory({
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  });
  let entityTrace = entityTraceFactory(mapItems, stop);
  return {
    name: 'segment',
    ...entityTrace,
    ...state,
    ...renderConfig,
    ...stylesConfig
  }
};