import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import { HtBounds } from "../map-utils/interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IExtendBoundsBase {
  getBounds: (item, bounds: HtBounds) => HtBounds
  mapInstance: MapInstance;
}
export function ExtendBoundsMixin<TBase extends Constructor<IExtendBoundsBase>>(Base: TBase) {
  return class extends Base {
    entities: Entities<any> = {};

    extendBounds(bounds: HtBounds) {
      let mapUtils = this.mapInstance.mapUtils;
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

