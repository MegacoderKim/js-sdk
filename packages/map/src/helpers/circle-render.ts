import {RenderConfig} from "../entities/interfaces";

export const circleRenderConfigFactory = (renderConfig: RenderConfig, mapUtils) => {
  return {
    ...renderConfig,
    getItem(data) {
      return mapUtils.getCircleMarker()
    }
  }
};