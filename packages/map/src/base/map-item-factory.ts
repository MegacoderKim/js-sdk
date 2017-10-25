import {mapItemsFactory, MarkerFactoryConfig} from "./map-items-factory";
import {MapEntities, Entity} from "../entities/interfaces";

export const mapItemFactory = (config: MarkerFactoryConfig): MapEntity<any> => {
  let markers = mapItemsFactory(config);
  return {
    ...markers,
    trace(user) {
      let data = user ? [user] : [];
      markers.trace(data)
    },
    getEntity() {
      if(!this.entities) return null;
      let keys = Object.keys(this.entities);
      if(keys.length == 0) return null;
      let key = keys[0];
      return this.entities[key];
    }
  }
};

export interface MapEntity<T> extends MapEntities<T> {
  getEntity(): Entity<T>
}

