import {MapUtils} from "../interfaces";
import {MapEntities} from "../entities/interfaces";
import {Color} from "ht-js-utils";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";
import {MapService} from "../map-service";
import {clusterRenderConfigFactory} from "../helpers/cluster-render";
import {polylineRenderConfigFactory} from "../helpers/polyline-render";
import {circleRenderConfigFactory} from "../helpers/circle-render";

export const mapItemsFactory = (config: MarkerFactoryConfig): MapEntities<any> => {
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
  if(config.isCircle) renderConfig = circleRenderConfigFactory(renderConfig);
  if(config.isPolyline) renderConfig = polylineRenderConfigFactory(renderConfig);
  if(config.isCluster) renderConfig = clusterRenderConfigFactory(renderConfig);
  // renderConfig = circleRenderConfigFactory(renderConfig, mapUtils);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };

  let entityTrace = entityTraceFactory(mapItems, config.data);

  return {
    name: config.name || 'marker',
    ...entityTrace,
    ...state,
    ...renderConfig,
    ...stylesConfig,
    setMap: !config.isCluster
  }
};

export interface MarkerFactoryConfig {
  data: any,
  stylesObj?: object,
  isCluster?: boolean,
  isPolyline?: boolean,
  isCircle?: boolean,
  name?: string
}