import {MapUtils} from "../interfaces";
import {MapEntities} from "../entities/interfaces";
import {Color} from "ht-js-utils";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";

export const markersFactory = (mapUtils: MapUtils, config: MarkerFactoryConfig): MapEntities<any> => {
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

  let renderConfig = markerRenderConfigFactory(mapUtils);
  // renderConfig = circleRenderConfigFactory(renderConfig, mapUtils);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };

  let entityTrace = entityTraceFactory(mapUtils, mapItems, config.data);

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