import * as _ from "underscore";
import {Constructor, Entities, Entity} from "../interfaces";
import { HtBounds } from "../map-utils/interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface ITraceBase {
  getItem: (data) => any;
  onMouseLeave?: (trace) => void;
  onClick?: (trace) => void;
  onMouseEnter?: (trace) => void;
  setStyle: (entity: Entity) => void;
  update: (entity) => void;
  traceEffect?: () => void;
  removeAll: (entities) => void;
  getBounds: (item, bounds?) => HtBounds;
  removeItem: (item) => void;
  removeData: (data) => void;
  clearItem: (entity: Entity) => void;
  toNotSetMap?: boolean;
  toNotTraceItem?: boolean
  // cluster?: any;
  mapInstance: MapInstance,
  // clearAllClusters: (data: any[]) => void
}

export interface ITraceConfig {
  toNotTraceItem?: boolean
};

export function TraceMixin<TBase extends Constructor<ITraceBase>>(Base: TBase) {
  return class extends Base {
    
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
          let item = !hasEntity ? this.getItem(datum) : entity.item;
          entity = { data: datum, item, isOld: false };
          this.entities[id] = entity;
          if (!hasEntity) {
            this.addEvents(item, id)
          }
          if (item) this.setStyle(entity);
          if (!this.toNotTraceItem) this.traceItem(datum);
          // if (!this.toNotSetMap) mapUtils.setMap(item, map);
        });
        if (this.traceEffect) this.traceEffect();
      } else {
        // console.log("remove all", this);
        this.removeAll(this.entities);
      }
      this.bustOldItem();
    };

    traceItem(datum) {
      let id = datum["id"];
      let entity = this.entities[id];
      if(entity) {
        this.update(entity);
      }

    };

    addEvents(item, id) {
      let mapUtils = this.mapInstance.mapUtils;
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
    }

    bustOldItem() {
      let entities: Entities<any> = this.entities;
      _.each(entities, entity => {
        if (entity.isOld) {
          this.clearItem(entity);
          // this.removeItem(entity.item);
          // this.removeData(entity.data);
        } else {
          entity.isOld = true;
        }
      });
    }

    getEntity(id?: string): Entity<any> {
      if (!this.entities) return null;
      if (id) return this.entities[id];
      let keys = Object.keys(this.entities);
      if (keys.length == 0) return null;
      let key = keys[0];
      return this.entities[key];
    }
  };
}

