import {MapEntities} from "../entities/interfaces";
import {StyleObj, stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../renderers/marker-render";
import {entityTraceFactory} from "../helpers/trace-factory";
import {MapService} from "../map-service";
import {clusterRenderConfigFactory} from "../renderers/cluster-render";
import {polylineRenderConfigFactory} from "../renderers/polyline-render";
import {circleRenderConfigFactory} from "../renderers/circle-render";
import {divMarkerRender} from "../renderers/div-marker-render";

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
  if(config.isDiv) renderConfig = divMarkerRender(renderConfig);

  let mapItems = {
    name: config.name || 'marker',
    entities: {},
    ...state,
    ...renderConfig,
    ...stylesConfig,
    setMap: !config.isCluster,
    cluster: null
  };

  if(config.isCluster) MapService.addCluster(mapItems);
  let entityTrace = entityTraceFactory(mapItems, config.data);


  return entityTrace

};

export interface MarkerFactoryConfig {
  data: any,
  stylesObj?: Partial<StyleObj>,
  isCluster?: boolean,
  isPolyline?: boolean,
  isCircle?: boolean,
  isDiv?: boolean,
  name?: string
}