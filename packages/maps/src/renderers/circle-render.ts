import {RenderConfig, MapEntities, Entity} from "../entities/interfaces";
import {MapService} from "../map-service";
import {HtPosition} from "ht-data";

export const circleRenderConfigFactory = (renderConfig: RenderConfig) => {
  let mapUtils = MapService.mapUtils;
  return {
    ...renderConfig,
    getItem(data) {
      return mapUtils.getCircleMarker()
    }
  }
};