import {MapEntities} from "../entities/interfaces";
import {StyleObj, stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../renderers/marker-render";
import {entityTraceFactory} from "../helpers/trace-factory";
import {MapService} from "../map-service";
import {clusterRenderConfigFactory} from "../renderers/cluster-render";
import {polylineRenderConfigFactory} from "../renderers/polyline-render";
import {circleRenderConfigFactory} from "../renderers/circle-render";

export const mapItemsFactory = (config: MarkerFactoryConfig): MapEntities<any> => {
  let mapUtils = MapService.mapUtils;
  let state = {
    map: null,
  };

  let stylesConfig = stylesConfigFactory(mapUtils.type, config.stylesObj);

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
  stylesObj?: Partial<StyleObj>,
  isCluster?: boolean,
  isPolyline?: boolean,
  isCircle?: boolean,
  name?: string
}