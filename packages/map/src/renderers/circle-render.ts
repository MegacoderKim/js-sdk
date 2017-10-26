import {RenderConfig} from "../entities/interfaces";
import {MapService} from "../map-service";

export const circleRenderConfigFactory = (renderConfig: RenderConfig) => {
  let mapUtils = MapService.mapUtils;
  return {
    ...renderConfig,
    getItem(data) {
      return mapUtils.getCircleMarker()
    }
  }
};