import {Constructor, Entities, Entity} from "../interfaces";

export interface ISingleItemBase {
  entities: Entities<any>;
  trace(data, map?): void
}
export function SingleItemMixin <TBase extends Constructor<ISingleItemBase>>(Base: TBase) {
  return class extends Base {

    trace(user, map?) {
      let data = user ? [user] : [];
      super.trace(data, map)
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