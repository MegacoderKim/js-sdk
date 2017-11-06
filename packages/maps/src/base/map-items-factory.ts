import {DataConfig, EventConfig, MapEntities} from "../entities/interfaces";
import {StyleObj, stylesConfigFactory} from "../helpers/styles-factory";
import {markerRenderConfigFactory} from "../renderers/marker-render";
import {entityTraceFactory} from "../helpers/trace-factory";
import {MapService} from "../map-service";
import {clusterRenderConfigFactory} from "../renderers/cluster-render";
import {polylineRenderConfigFactory} from "../renderers/polyline-render";
import {circleRenderConfigFactory} from "../renderers/circle-render";
import {divMarkerRender} from "../renderers/div-marker-render";

export const mapItemsFactory = (config: MapItemsFactoryConfig): MapEntities<any> => {
  let mapUtils = MapService.mapUtils;
  let state = {
    map: null,
  };

  let stylesConfig = stylesConfigFactory(mapUtils.type, config.stylesObj);

  let renderConfig = markerRenderConfigFactory(config.eventConfig, config.dataConfig);
  if(config.isCircle) renderConfig = circleRenderConfigFactory(renderConfig);
  if(config.isPolyline) renderConfig = polylineRenderConfigFactory(renderConfig);
  if(config.isCluster) renderConfig = clusterRenderConfigFactory(renderConfig);
  if(config.isDiv) renderConfig = divMarkerRender(renderConfig);

  let popupStyle = stylesConfig.styles('popup');
  let popupObj = !config.hasPopup ?
    {} : {
    popup: mapUtils.getPopup(popupStyle),
    setPopup(id: string | null) {
      if (id && this.entities[id]) {
        let {data} = this.entities[id];
        let popup = this.popup;
        let map = MapService.map;
        mapUtils.openPopupPosition(mapItems.getPosition(data), map, mapItems.getInfoContent(data), popup);
      } else {
        mapUtils.setMap(this.popup, null)
      }
    }
  };

  let mapItems = {
    name: config.name || 'marker',
    entities: {},
    ...state,
    ...renderConfig,
    ...stylesConfig,
    setMap: !config.isCluster,
    cluster: null,
    ...popupObj,
  };

  if(config.isCluster) MapService.addCluster(mapItems);
  let entityTrace = entityTraceFactory(mapItems);


  return entityTrace

};

export interface MapItemsFactoryConfig {
  dataConfig: DataConfig<any>,
  stylesObj?: Partial<StyleObj>,
  eventConfig?: EventConfig,
  isCluster?: boolean,
  isPolyline?: boolean,
  isCircle?: boolean,
  isDiv?: boolean,
  name?: string,
  hasPopup?: boolean,
  // popupConfig?: object
}