import { GlobalMap } from "../global/map-service";
import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import { HtBounds } from "../map-utils/interfaces";

export interface IExtendBoundsBase {
  getBounds: (item, bounds: HtBounds) => HtBounds
}
export function ExtendBoundsMixin<TBase extends Constructor<IExtendBoundsBase>>(Base: TBase) {
  return class extends Base {
    entities: Entities<any> = {};
    extendBounds(bounds: HtBounds) {
      let mapUtils = GlobalMap.mapUtils;
      bounds = bounds || mapUtils.extendItemBounds();
      let newBounds = _.reduce(
        this.entities,
        (bounds, entity) => {
          return this.getBounds(entity.item, bounds);
        },
        bounds
      );
      return newBounds;
    }
  };
}

