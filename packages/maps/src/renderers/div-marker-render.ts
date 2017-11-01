import {Entity, MapEntities, RenderConfig} from "../entities/interfaces";
import {MapService} from "../map-service";
import {MapUtils} from "../interfaces";
import {HtPosition} from "ht-data";

export const divMarkerRender = (renderConfig: RenderConfig) => {
  let mapUtils: MapUtils = MapService.mapUtils;
  return {
    ...renderConfig,
    getItem(data) {
      return mapUtils.getDivMarker()
    },
    update({item, data}) {
      let content = this.getDivContent(data);
      mapUtils.setDivContent(item, content);
      renderConfig.update({item, data})
    },
    setStyle(item) {
      let style = this.styles();
      mapUtils.setDivMarkerStyle(item, style)
    },
  }
};