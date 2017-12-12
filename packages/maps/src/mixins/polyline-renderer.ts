import {Constructor} from "../interfaces";
import {positionTime} from "../helpers/position-time-helper";
import {MapService} from "../global/map-service";

export interface IPolylinesBase {
  getEncodedPositionTime;
  getEncodedPath(data): any;
  getStyle: (string?) => object;
}

export function PolylinesMixin <TBase extends Constructor<IPolylinesBase>>(Base: TBase) {
  return class extends Base {
    positionTimeArray = [];

    getItem(data) {
      return MapService.mapUtils.getPolyline()
    };

    getBounds(item, bounds?) {
      return MapService.mapUtils.extendBoundsWithPolyline(item, bounds)
    };

    update({item, data}) {
      if(this.getEncodedPositionTime) {
        this.positionTimeArray = positionTime.decode(data.time_aware_polyline);
        MapService.mapUtils.setPathPositionTimeArray(item, this.positionTimeArray)
      } else {
        MapService.mapUtils.setEncodedPath(item, this.getEncodedPath(data))
      }

    }

    setStyle(item) {
      let style = this.getStyle();
      MapService.mapUtils.setPolylineStyle(item, style)
    };
  }
}