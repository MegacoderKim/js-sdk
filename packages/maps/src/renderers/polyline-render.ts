import {RenderConfig, Entity, MapEntities} from "../entities/interfaces";
import {MapUtils} from "../interfaces";
import {MapService} from "../map-service";
import {HtPosition} from "ht-data";
import {positionTime} from "../helpers/position-time-helper";

export const polylineRenderConfigFactory = (renderConfig: RenderConfig) => {
  let mapUtils = MapService.mapUtils;

  return {
    ...renderConfig,
    // getEncodedPath(data) {
    //   return data.encoded_polyline;
    // },
    positionTimeArray: [],
    getItem(data) {
      return mapUtils.getPolyline()
    },
    getBounds(item, bounds?) {
      return mapUtils.extendBoundsWithPolyline(item, bounds)
    },
    update({item, data}) {
      if(this.getEncodedPositionTime) {
        this.positionTimeArray = positionTime.decode(data.time_aware_polyline);
        mapUtils.setPathPositionTimeArray(item, this.positionTimeArray)
      } else {
        mapUtils.setEncodedPath(item, this.getEncodedPath(data))
      }

    }
  }
};