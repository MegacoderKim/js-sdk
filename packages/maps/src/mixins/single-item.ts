
import {Constructor} from "../interfaces";
import {Entities, Entity} from "../entities/interfaces";

export function SingleItemMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    entities: Entities<any>;

    trace(user) {
      let data = user ? [user] : [];
      super['trace'](data)
    };

    getEntity(): Entity<any> {
      if(!this.entities) return null;
      let keys = Object.keys(this.entities);
      if(keys.length == 0) return null;
      let key = keys[0];
      return this.entities[key];
    }
  }
}