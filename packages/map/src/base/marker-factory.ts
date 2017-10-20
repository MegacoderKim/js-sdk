import {MapUtils} from "../interfaces";
import {MapEntities} from "../entities/interfaces";
import {Color} from "ht-js-utils";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";
import {MapService} from "../map-service";

export const markersFactory = (config: MarkerFactoryConfig): MapEntities<any> => {
  let mapUtils = MapService.mapUtils;
  let state = {
    map: null,
  };
  let stylesObj = {
    google: {
      default: {

      }
    },
    leaflet: {
      default: {

      }
    }
  };
  let stylesConfig = stylesConfigFactory(config.stylesObj || stylesObj, mapUtils.type);

  let renderConfig = markerRenderConfigFactory();
  // renderConfig = circleRenderConfigFactory(renderConfig, mapUtils);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };

  let entityTrace = entityTraceFactory(mapItems, config.data);

  return {
    name: 'stop',
    ...entityTrace,
    ...state,
    ...renderConfig,
    ...stylesConfig
  }
};

export interface MarkerFactoryConfig {
  data: any,
  stylesObj?: object
}