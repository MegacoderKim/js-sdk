import {HtMapUtils} from "../map-utils";
import {Entities} from "../entities/interfaces";
import * as _ from "underscore";

export const entityTraceFactory = (mapUtils: HtMapUtils, renderConfig, dataFactory) => {

  function bustOlditem(entities: Entities<any>) {
    _.each(entities, (entity) => {
      if(entity.isOld) {
        renderConfig.remove(entity.item);
      } else {
        entity.isOld = true;
      }
    })
  }

  return {
    entities: {},
    trace(data) {
      // let renderConfig = this.renderer;

      if(data && data.length) {
        _.each(data, datum => {
          let id = datum['id'];
          let entity = this.entities[id];
          let hasEntity = !!entity;
          let item;
          if(!hasEntity) {
            item = renderConfig.getItem(datum);
            // item = {...dataFactory(datum), item: mapItem, isOld: true}
          } else {
            item = entity.item;
          }
          this.entities[id] = {...dataFactory(datum), item, isOld: false};
          // console.log(this.map);
          renderConfig.update(this.entities[id]);
          renderConfig.setMap && mapUtils.setMap(item, this.map);
        });
        bustOlditem(this.entities);
        if(renderConfig.onUpdate) renderConfig.onUpdate(this.entities);
      } else {
        renderConfig.removeAll(this.entities)
      }

      //bust old;
    },
    extendBounds(bounds) {
      // let renderConfig = this.renderer;
      bounds = bounds || mapUtils.extendBounds();
      let newBounds = _.reduce(this.entities, (bounds, entity) => {
        return renderConfig.getBounds(entity.item, bounds);
      }, bounds);
      return newBounds
    }
  }
};