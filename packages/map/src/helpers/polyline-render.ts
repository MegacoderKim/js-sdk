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
    update(entity) {
      mapUtils.setEncodedPath(entity.item, entity.getEncodedPath())
    }
  }
};