import {RenderConfig, Entity, MapEntities} from "../entities/interfaces";
import {MapUtils} from "../interfaces";
import {MapService} from "../map-service";
import {HtPosition} from "ht-data";

export const polylineRenderConfigFactory = (renderConfig: RenderConfig) => {
  let mapUtils = MapService.mapUtils;

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
    update({item, data}) {
      mapUtils.setEncodedPath(item, this.getEncodedPath(data))
    }
  }
};