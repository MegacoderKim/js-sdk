import {Entities} from "../entities/interfaces";
import * as _ from "underscore";
import {MapUtils} from "../interfaces";
import {MapService} from "../map-service";

export const entityTraceFactory = (mapItems, dataFactory) => {
  let mapUtils = MapService.mapUtils;

  function bustOlditem() {
    let entities: Entities<any> = mapItems.entities;
    _.each(entities, (entity) => {
      if(entity.isOld) {
        mapItems.removeItem(entity.item);
        mapItems.remove(entity.data);
      } else {
        entity.isOld = true;
      }
    })
  }

  return {
    ...mapItems,
    trace(data, map?) {
      mapItems.map = MapService.map;
      if(!mapItems.map) {
        console.warn("Map is not initialized")
      }
      if(data && data.length) {
        _.each(data, datum => {
          let id = datum['id'];
          let entity = mapItems.entities[id];
          let hasEntity = !!entity;
          let item;
          if(!hasEntity) {
            item = mapItems.getItem(datum);
            mapUtils.onEvent(item, 'click', () => {
              if(mapItems.onClick) mapItems.onClick(datum, item);
            });
            mapItems.setStyle(item)
          } else {
            item = entity.item;
          }
          mapItems.entities[id] = {...dataFactory(datum), item, isOld: false};
          mapItems.update(mapItems.entities[id]);
          mapItems.setMap && mapUtils.setMap(item, mapItems.map);
        });
        if(mapItems.traceEffect) mapItems.traceEffect();
      } else {
        // console.log("remove all", this);
        mapItems.removeAll(mapItems.entities);
      }
      bustOlditem();

    },
    extendBounds(bounds) {
      bounds = bounds || mapUtils.extendBounds();
      let newBounds = _.reduce(mapItems.entities, (bounds, entity) => {
        return mapItems.getBounds(entity.item, bounds);
      }, bounds);
      return newBounds
    }
  }
};