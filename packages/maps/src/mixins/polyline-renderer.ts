import { Constructor } from "../interfaces";
import { positionTime } from "../helpers/position-time-helper";
import {HtBounds} from "../map-utils/interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IPolylinesBase {
  getEncodedPositionTime;
  getEncodedPath(data): any;
  getStyle: (string?) => object;
  mapInstance: MapInstance
}

export function PolylinesMixin<TBase extends Constructor<IPolylinesBase>>(
  Base: TBase
) {
  return class extends Base {
    positionTimeArray = [];

    getItem(data) {
      return this.mapInstance.mapUtils.getPolyline();
    }

    getBounds(item, bounds?): HtBounds {
      return this.mapInstance.mapUtils.extendBoundsWithPolyline(item, bounds);
    }

    update({ item, data }) {
      if (this.getEncodedPositionTime) {
        this.positionTimeArray = positionTime.decode(data.time_aware_polyline);
        this.mapInstance.mapUtils.setPathPositionTimeArray(
          item,
          this.positionTimeArray
        );
      } else {
        this.mapInstance.mapUtils.setEncodedPath(item, this.getEncodedPath(data));
      }
    }

    setStyle(item) {
      let style = this.getStyle();
      this.mapInstance.mapUtils.setPolylineStyle(item, style);
    }
  };
}
