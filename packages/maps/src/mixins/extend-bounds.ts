import { GlobalMap } from "../global/map-service";
import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import { HtBounds } from "../map-utils/interfaces";

export interface IExtendBoundsBase {
  forceExtendBounds?: boolean
}
export function ExtendBoundsMixin<TBase extends Constructor<IExtendBoundsBase>>(Base: TBase) {
  return class extends Base {
    entities: Entities<any> = {};
    extendBounds(bounds: HtBounds) {
      let mapUtils = GlobalMap.mapUtils;
      bounds = bounds || mapUtils.extendBounds();
      let newBounds = _.reduce(
        this.entities,
        (bounds, entity) => {
          return this.getBounds(entity.item, bounds);
        },
        bounds
      );
      return newBounds;
    }
    getBounds(item, bounds?) {
      return GlobalMap.mapUtils.extendBounds(item, bounds, this.forceExtendBounds);
    }
  };
}

