import { Constructor } from "../interfaces";
import { positionTime } from "../helpers/position-time-helper";
import { GlobalMap } from "../global/map-service";
import {HtBounds} from "../map-utils/interfaces";

export interface IPolylinesBase {
  getEncodedPositionTime;
  getEncodedPath(data): any;
  getStyle: (string?) => object;
}

export function PolylinesMixin<TBase extends Constructor<IPolylinesBase>>(
  Base: TBase
) {
  return class extends Base {
    positionTimeArray = [];

    getItem(data) {
      return GlobalMap.mapUtils.getPolyline();
    }

    getBounds(item, bounds?): HtBounds {
      return GlobalMap.mapUtils.extendBoundsWithPolyline(item, bounds);
    }

    update({ item, data }) {
      if (this.getEncodedPositionTime) {
        this.positionTimeArray = positionTime.decode(data.time_aware_polyline);
        GlobalMap.mapUtils.setPathPositionTimeArray(
          item,
          this.positionTimeArray
        );
      } else {
        GlobalMap.mapUtils.setEncodedPath(item, this.getEncodedPath(data));
      }
    }

    setStyle(item) {
      let style = this.getStyle();
      GlobalMap.mapUtils.setPolylineStyle(item, style);
    }
  };
}
