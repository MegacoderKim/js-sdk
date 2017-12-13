import { MapService } from "../global/map-service";
import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import { HtBounds } from "../map-utils/interfaces";

export interface ITraceBase {
  getItem: (data) => any;
  onMouseLeave: (trace) => void;
  onClick: (trace) => void;
  onMouseEnter: (trace) => void;
  setStyle: (item) => void;
  update: (entity) => void;
  traceEffect: () => void;
  removeAll: (entities) => void;
  getBounds: (item, bounds?) => HtBounds;
  removeItem: (item) => void;
  removeData: (data) => void;
  toSetMap: boolean;
  cluster?: any;
}
export function TraceMixin<TBase extends Constructor<ITraceBase>>(Base: TBase) {
  return class extends Base {
    map;
    entities: Entities<any> = {};

    // setMap: (item, map) => void;

    trace(data: any[] | null, map?) {
      this.map = MapService.map;
      let mapUtils = MapService.mapUtils;
      if (!this.map) {
        console.warn("Map is not initialized");
        return false;
      }
      if (data && data.length) {
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
          if (!this.cluster) mapUtils.setMap(item, this.map);
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
    extendBounds(bounds) {
      let mapUtils = MapService.mapUtils;
      bounds = bounds || mapUtils.extendBounds();
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

// export class Trace {
//   map;
//   entities: Entities<any> = {};
//   getItem: (data) => any;
//   onMouseLeave: (trace) => void;
//   onClick: (trace) => void;
//   onMouseEnter: (trace) => void;
//   setStyle: (item) => void;
//   update: (entity) => void;
//   // setMap: (item, map) => void;
//   traceEffect: () => void;
//   removeAll: (entities) => void;
//   getBounds: (item, bounds?) => HtBounds;
//   removeItem: (item) => void;
//   removeData: (data) => void;
//   toSetMap: boolean;
//   cluster;
//   trace(data: any[] | null, map?) {
//     this.map = MapService.map;
//     let mapUtils = MapService.mapUtils;
//     if(!this.map) {
//       console.warn("Map is not initialized");
//       return false
//     }
//     if(data && data.length) {
//       _.each(data, datum => {
//         let id = datum['id'];
//         let entity = this.entities[id];
//         let hasEntity = !!entity;
//         let item;
//         if(!hasEntity) {
//           item = this.getItem(datum);
//           mapUtils.onEvent(item, 'click', () => {
//             let entity = this.entities[id];
//             if(this.onMouseLeave) this.onMouseLeave(entity);
//             if(this.onClick) this.onClick(entity);
//           });
//           mapUtils.onEvent(item, 'mouseover', () => {
//             let entity = this.entities[id];
//             if(this.onMouseEnter) this.onMouseEnter(entity);
//           });
//           mapUtils.onEvent(item, 'mouseout', () => {
//             let entity = this.entities[id];
//             if(this.onMouseLeave) this.onMouseLeave(entity);
//           });
//           this.setStyle(item)
//         } else {
//           item = entity.item;
//         }
//         this.entities[id] = {data: datum, item, isOld: false};
//         this.update(this.entities[id]);
//         if(!this.cluster) mapUtils.setMap(item, this.map);
//       });
//       if(this.traceEffect) this.traceEffect();
//     } else {
//       // console.log("remove all", this);
//       this.removeAll(this.entities);
//     }
//     this.bustOldItem();
//
//   };
//   bustOldItem() {
//     let entities: Entities<any> = this.entities;
//     _.each(entities, (entity) => {
//       if(entity.isOld) {
//         this.removeItem(entity.item);
//         this.removeData(entity.data);
//       } else {
//         entity.isOld = true;
//       }
//     })
//   };
//   extendBounds(bounds) {
//     let mapUtils = MapService.mapUtils;
//     bounds = bounds || mapUtils.extendBounds();
//     let newBounds = _.reduce(this.entities, (bounds, entity) => {
//       return this.getBounds(entity.item, bounds);
//     }, bounds);
//     return newBounds
//   }
// }
