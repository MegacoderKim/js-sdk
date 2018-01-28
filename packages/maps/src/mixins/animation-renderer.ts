import { Constructor } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {TimeAwareAnimation} from "time-aware-polyline";
import {HtPosition} from "ht-models";

export interface IAnimationBase {
  // mapInstance: MapInstance
  getTimeAwarePolyline: (data) => string,
  update(entity): void;
  getDivContent(bearing): string;
  updatePathBearing(path, bearing): string;
// getStyle: (styleType?) => object;
}

export function AnimationMixin<TBase extends Constructor<IAnimationBase>>(Base: TBase) {
  return class extends Base {
    anim = new TimeAwareAnimation();
    // bearing: number = 0;
    // item;

    constructor(...args) {
      super(...args);
      this.anim.updatePathBearing = (path, bearing) => {
        // this.bearing = bearing;
        // let obj = {
        //   bearing,
        //   path
        // };
        this.updatePathBearing(path, bearing)
      }
    };


    update({ item, data }) {
      // this.item = item;
      if (data) {
        this.anim.updatePolylineString(this.getTimeAwarePolyline(data));
        // super.update({ item, data })
      } else {
        this.anim.clear();
      }
      // let position = this.getPosition(data);
      // if (position) this.mapInstance.mapUtils.updatePosition(item, position);
    };

    render({posiiton, bearing}) {

    }

    reset() {
      this.anim.clear();
    }
  };
}
