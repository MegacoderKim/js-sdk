import {RenderConfig} from "../entities/interfaces";
import {MapUtils} from "../interfaces";

export const polylineRenderConfigFactory = (renderConfig: RenderConfig, mapUtils: MapUtils) => {
  return {
    ...renderConfig,
    // getEncodedPath(data) {
    //   return data.encoded_polyline;
    // },
    getItem(data) {
      return mapUtils.getPolyline()
    },
    getBounds(item, bounds?) {
      return mapUtils.extendBoundsWithPolyline(item, bounds)
    },
    update(entity) {
      mapUtils.setEncodedPath(entity.item, entity.getEncodedPath())
    }
  }
};