import {Entities, MapEntities} from "../entities/interfaces";
import * as _ from "underscore";
import {MapUtils} from "../interfaces";
import {MapService} from "../map-service";
import {dataFactory} from "./data-factory";

export const entityTraceFactory = (mapItems): MapEntities<any> => {
  let mapUtils = MapService.mapUtils;
  // let dataObj = dataFactory(dataFactoryConfig);
  function bustOldItem() {
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
    trace(data: any[] | null, map?) {
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
              let entity = mapItems.entities[id];
              if(this.onMouseLeave) this.onMouseLeave(this, entity);
              if(this.onClick) this.onClick(this, entity);
            });
            mapUtils.onEvent(item, 'mouseover', () => {
              let entity = mapItems.entities[id];
              // if(mapItems.onClick) mapItems.onClick(entity, this);
              if(this.onMouseEnter) this.onMouseEnter(this, entity);
              // if(mapItems.onMouseLeave) mapItems.onMouseLeave(entity, this);
            });
            mapUtils.onEvent(item, 'mouseout', () => {
              let entity = mapItems.entities[id];
              // if(mapItems.onClick) mapItems.onClick(entity, this);
              // if(mapItems.onMouseEnter) mapItems.onMouseEnter(entity, this);
              if(this.onMouseLeave) this.onMouseLeave(this, entity);
            });
            mapItems.setStyle(item)
          } else {
            item = entity.item;
          }
          mapItems.entities[id] = {data: datum, item, isOld: false};
          mapItems.update(mapItems.entities[id]);
          mapItems.setMap && mapUtils.setMap(item, mapItems.map);
        });
        if(mapItems.traceEffect) mapItems.traceEffect();
      } else {
        // console.log("remove all", this);
        mapItems.removeAll(mapItems.entities);
      }
      bustOldItem();

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