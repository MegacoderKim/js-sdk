import {EventConfig, MapEntities} from "../entities/interfaces";
import {StyleObj, stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../renderers/marker-render";
import {entityTraceFactory} from "../helpers/trace-factory";
import {MapService} from "../map-service";
import {clusterRenderConfigFactory} from "../renderers/cluster-render";
import {polylineRenderConfigFactory} from "../renderers/polyline-render";
import {circleRenderConfigFactory} from "../renderers/circle-render";
import {divMarkerRender} from "../renderers/div-marker-render";
import {DataFactoryConfig} from "../helpers/data-factory";

export const mapItemsFactory = (config: MarkerFactoryConfig): MapEntities<any> => {
  let mapUtils = MapService.mapUtils;
  let state = {
    map: null,
  };

  let stylesConfig = stylesConfigFactory(mapUtils.type, config.stylesObj);

  let renderConfig = markerRenderConfigFactory(config.eventConfig);
  if(config.isCircle) renderConfig = circleRenderConfigFactory(renderConfig);
  if(config.isPolyline) renderConfig = polylineRenderConfigFactory(renderConfig);
  if(config.isCluster) renderConfig = clusterRenderConfigFactory(renderConfig);
  if(config.isDiv) renderConfig = divMarkerRender(renderConfig);


  let popupObj = !config.hasPopup ? {} : {popup: mapUtils.getPopup(config.popupConfig)};

  let mapItems = {
    name: config.name || 'marker',
    entities: {},
    ...state,
    ...renderConfig,
    ...stylesConfig,
    setMap: !config.isCluster,
    cluster: null,
    ...popupObj
  };

  if(config.isCluster) MapService.addCluster(mapItems);
  let entityTrace = entityTraceFactory(mapItems, config.dataFactoryConfig);


  return entityTrace

};

export interface MarkerFactoryConfig {
  dataFactoryConfig: DataFactoryConfig<any>,
  stylesObj?: Partial<StyleObj>,
  eventConfig?: EventConfig,
  isCluster?: boolean,
  isPolyline?: boolean,
  isCircle?: boolean,
  isDiv?: boolean,
  name?: string,
  hasPopup?: boolean,
  popupConfig?: object
}