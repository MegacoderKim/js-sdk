import {Entities} from "../entities/interfaces";
import * as _ from "underscore";
import {MapUtils} from "../interfaces";
import {MapService} from "../map-service";

export const entityTraceFactory = (mapItems, dataFactory) => {
  // let {entities, renderer, map} = mapItems;
  let mapUtils = MapService.mapUtils;

  function bustOlditem(item) {
    let entities: Entities<any> = item.entities;
    _.each(entities, (entity) => {
      if(entity.isOld) {
        item.removeItem(entity.item);
        item.remove(entity.data);
      } else {
        entity.isOld = true;
      }
    })
    // console.log(item.entities);
  }

  return {
    entities: {},
    trace(data, map?) {
      this.map = MapService.map;
      if(!this.map) {
        console.warn("Map is not initialized")
      }
      if(data && data.length) {
        _.each(data, datum => {
          let id = datum['id'];
          let entity = this.entities[id];
          let hasEntity = !!entity;
          let item;
          if(!hasEntity) {
            item = this.getItem(datum);
            // let newEntity = {...dataFactory(datum), item};
            mapUtils.onEvent(item, 'click', () => {
              if(this.onClick) this.onClick(datum, item);
            });
            this.setStyle(item)
            // item = {...dataFactory(datum), item: mapItem, isOld: true}
          } else {
            item = entity.item;
          }
          this.entities[id] = {...dataFactory(datum), item, isOld: false};
          // console.log(this.map);
          this.update(this.entities[id]);
          this.setMap && mapUtils.setMap(item, this.map);
        });
        if(this.traceEffect) this.traceEffect();
      } else {
        // console.log("remove all", this);
        this.removeAll(this.entities);
        // this.entities = {}
      }
      bustOlditem(this);
      // console.log(this.entities["6c5c1bae-9529-43e7-a21c-f9bd864bcb30"]);
      //bust old;
    },
    extendBounds(bounds) {
      // let renderConfig = this.renderer;
      bounds = bounds || mapUtils.extendBounds();
      let newBounds = _.reduce(this.entities, (bounds, entity) => {
        return this.getBounds(entity.item, bounds);
      }, bounds);
      return newBounds
    }
  }
};