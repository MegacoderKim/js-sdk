import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import { HtBounds } from "../map-utils/interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface ITraceBase {
  getItem: (data) => any;
  onMouseLeave?: (trace) => void;
  onClick?: (trace) => void;
  onMouseEnter?: (trace) => void;
  setStyle: (item) => void;
  update: (entity) => void;
  traceEffect?: () => void;
  removeAll: (entities) => void;
  getBounds: (item, bounds?) => HtBounds;
  removeItem: (item) => void;
  removeData: (data) => void;
  toNotSetMap?: boolean;
  // cluster?: any;
  mapInstance: MapInstance,
  // clearAllClusters: (data: any[]) => void
}
export function TraceMixin<TBase extends Constructor<ITraceBase>>(Base: TBase) {
  return class extends Base {
    // map;
    entities: Entities<any> = {};

    // setMap: (item, map) => void;

    trace(data: any[] | null, map?) {
      map = map || this.mapInstance.map;
      let mapUtils = this.mapInstance.mapUtils;
      if (!map) {
        console.warn("Map is not initialized");
        return false;
      }
      if (data && data.length) {
        // if(this.cluster) this.clearAllClusters(data);
        _.each(data, datum => {
          let id = datum["id"];
          let entity = this.entities[id];
          let hasEntity = !!entity;
          let item;
          if (!hasEntity) {
            item = this.getItem(datum);
            mapUtils.onEvent(item, "click", () => {
              let entity = this.entities[id];
              if (this.onMouseLeave) this.onMouseLeave(entity);
              if (this.onClick) this.onClick(entity);
            });
            mapUtils.onEvent(item, "mouseover", () => {
              let entity = this.entities[id];
              if (this.onMouseEnter) this.onMouseEnter(entity);
            });
            mapUtils.onEvent(item, "mouseout", () => {
              let entity = this.entities[id];
              if (this.onMouseLeave) this.onMouseLeave(entity);
            });
            this.setStyle(item);
          } else {
            item = entity.item;
          }
          this.entities[id] = { data: datum, item, isOld: false };
          this.update(this.entities[id]);
          if (!this.toNotSetMap) mapUtils.setMap(item, map);
        });
        if (this.traceEffect) this.traceEffect();
      } else {
        // console.log("remove all", this);
        this.removeAll(this.entities);
      }
      this.bustOldItem();
    }
    bustOldItem() {
      let entities: Entities<any> = this.entities;
      _.each(entities, entity => {
        if (entity.isOld) {
          this.removeItem(entity.item);
          this.removeData(entity.data);
        } else {
          entity.isOld = true;
        }
      });
    }
  };
}

