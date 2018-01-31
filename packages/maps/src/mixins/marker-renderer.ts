import { Constructor, Entities } from "../interfaces";
import {HtBounds, HtMap} from "../map-utils/interfaces";
import { HtPosition } from "ht-models";
import * as _ from "underscore";
import {MapInstance} from "../map-utils/map-instance";
import {IPathBearingTime} from "ht-models";

export interface IMarkersBase {
  getStyle: (styleType?) => object;
  getPosition: (data) => HtPosition;
  forceExtendBounds?: boolean;
  mapInstance: MapInstance;
  toNotSetMap?: boolean;
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

    update({ item, data }, positionBearing?: IPathBearingTime) {
      let pathPosition = positionBearing && positionBearing.path.length ?
        positionBearing.path[positionBearing.path.length - 1] : null;
      let position = pathPosition || this.getPosition(data);
      if (position) this.mapInstance.mapUtils.updatePosition(item, position);
      if (!this.toNotSetMap) this.mapInstance.mapUtils.setMap(item, this.mapInstance.map);
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

    clear() {
      const entities = this.entities;
      this.removeAll(entities)
    }

    removeData(data) {
      let id = data.id;
      if (this.entities[id]) delete this.entities[id];
    }
  };
}
