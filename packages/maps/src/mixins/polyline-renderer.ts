import { Constructor } from "../interfaces";
import { positionTime } from "../helpers/position-time-helper";
import {HtBounds} from "../map-utils/interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {ITimeAwarePoint} from "ht-models";

export interface IPolylinesBase {
  getPath?(path: ITimeAwarePoint[]): void;
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
      if (this.getPath) {
        let path = this.getPath(data);
        this.mapInstance.mapUtils.setPathPositionTimeArray(
          item,
          path
        )
      }
      else if (this.getEncodedPositionTime) {
        this.positionTimeArray = positionTime.decode(this.getEncodedPositionTime(data));
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
