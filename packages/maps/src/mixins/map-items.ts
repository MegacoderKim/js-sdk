import {Constructor, Entities, Entity} from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {HtCustomEvent, IEventSub} from "ht-utility";
import * as _ from "underscore";

export interface IMapItemsBase {
  mapInstance: MapInstance
  trackBy?(datum): string;
  trackAnimationBy?(datum): string;
}

export function MapItemsMixin<TBase extends Constructor<IMapItemsBase>>(Base: TBase) {
  return class extends Base {
    entities: Entities<any> = {};
    event = new HtCustomEvent();

    htShow(item) {
      return `display: ${item ? "flex" : "none"}`;
    }

    getEntity(id?: string): Entity<any> | null {
      if (!this.entities) return null;
      if (id) return this.entities[id];
      let keys = Object.keys(this.entities);
      if (keys.length == 0) return null;
      let key = keys[0];
      return this.entities[key];
    };

    trackBy(datum) {
      return super.trackBy ? super.trackBy(datum) : datum.id;
    }

    trackAnimationBy(datum) {
      return super.trackAnimationBy ? super.trackAnimationBy(datum) : this.trackBy(datum)
    };

    /**
     *
     * @param id string return trackBy
     * @returns {{subscribe: (cb) => IEventSub}}
     */
    onEntityUpdate(id): {subscribe: (cb) => IEventSub} {
      const eventName = `update-${id}`;
      return {
        subscribe: (cb) => {
          return this.event.subscribe(eventName, cb)
        }
      }
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

    clearItem({item, data}) {
      this.removeData(data);
      this.removeItem(item);
    }

    removeData(data) {
      let id = this.trackBy(data);
      if (this.entities[id]) delete this.entities[id];
    }

  };
}