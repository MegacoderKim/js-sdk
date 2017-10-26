import {RenderConfig} from "../entities/interfaces";
import {MapService} from "../map-service";
import {MapUtils} from "../interfaces";

export const divMarkerRender = (renderConfig: RenderConfig) => {
  let mapUtils: MapUtils = MapService.mapUtils;
  return {
    ...renderConfig,
    getItem(data) {
      return mapUtils.getDivMarker()
    },
    update(entity) {
      let content = entity.getDivContent();
      mapUtils.setDivContent(entity.item, content);
      renderConfig.update(entity)
    },
    setStyle(item) {
      let style = this.styles();
      mapUtils.setDivMarkerStyle(item, style)
    },
  }
};