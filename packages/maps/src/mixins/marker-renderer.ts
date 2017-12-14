import { Constructor, Entities } from "../interfaces";
import { HtMap } from "../map-utils/interfaces";
import { HtPosition } from "ht-data";
import { MapService } from "../global/map-service";
import * as _ from "underscore";

export interface IMarkersBase {
  getStyle: (styleType?) => object;
  getPosition: (data) => HtPosition;
}

export function MarkersMixin<TBase extends Constructor<IMarkersBase>>(
  Base: TBase
) {
  return class extends Base {
    entities: Entities<any> = {};
    cluster;

    htShow(item) {
      return `display: ${item ? "flex" : "none"}`;
    }

    getItem(data) {
      return MapService.mapUtils.getMarker();
    }

    getBounds(item, bounds?) {
      return MapService.mapUtils.extendBounds(item, bounds, !!this.cluster);
    }

    update({ item, data }) {
      let position = this.getPosition(data);
      if (position) MapService.mapUtils.updatePosition(item, position);
    }

    removeItem(item) {
      this.cluster &&
        MapService.mapUtils.removeClusterMarker(this.cluster, item);
      MapService.mapUtils.clearItem(item);
    }

    removeAll(entities) {
      _.each(entities, (entity: any) => {
        this.removeItem(entity.item);
      });
      this.entities = {};
    }

    setStyle(item) {
      let style = this.getStyle();
      MapService.mapUtils.setStyle(item, style);
    }

    removeData(data) {
      let id = data.id;
      if (this.entities[id]) delete this.entities[id];
    }
  };
}
