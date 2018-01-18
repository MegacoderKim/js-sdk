import { Constructor, Entities } from "../interfaces";
import {HtBounds, HtMap} from "../map-utils/interfaces";
import { HtPosition } from "ht-models";
import * as _ from "underscore";
import {MapInstance} from "../map-utils/map-instance";

export interface IMarkersBase {
  getStyle: (styleType?) => object;
  getPosition: (data) => HtPosition;
  forceExtendBounds?: boolean;
  mapInstance: MapInstance
}

export function MarkersMixin<TBase extends Constructor<IMarkersBase>>(
  Base: TBase
) {
  return class extends Base {
    entities: Entities<any> = {};
    htShow(item) {
      return `display: ${item ? "flex" : "none"}`;
    }

    getItem(data) {
      return this.mapInstance.mapUtils.getMarker();
    }

    getBounds(item, bounds?): HtBounds {
      return this.mapInstance.mapUtils.extendItemBounds(item, bounds, this.forceExtendBounds);
    }

    update({ item, data }) {
      let position = this.getPosition(data);
      if (position) this.mapInstance.mapUtils.updatePosition(item, position);
    }

    removeItem(item) {
      this.mapInstance.mapUtils.clearItem(item);
    }

    removeAll(entities) {
      _.each(entities, (entity: any) => {
        this.removeItem(entity.item);
      });
      this.entities = {};
    }

    removeData(data) {
      let id = data.id;
      if (this.entities[id]) delete this.entities[id];
    }
  };
}
