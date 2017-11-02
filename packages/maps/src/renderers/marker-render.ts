import {DataConfig, Entity, EventConfig, MapEntities, RenderConfig} from "../entities/interfaces";
import {HtMapUtils} from "../map-utils";
import {MapUtils} from "../interfaces";
import * as _ from "underscore";
import {MapService} from "../map-service";

export const markerRenderConfigFactory = (config: EventConfig = {}, dataConfig: DataConfig<any>): RenderConfig => {
  let mapUtils: MapUtils = MapService.mapUtils;
  let defaultEventConfig: EventConfig = {};
  if (dataConfig['getInfoContent']) {
    defaultEventConfig = {
      onMouseEnter(mapItems: MapEntities<any>, entity: Entity<any>) {
        let data = entity.data;
        let popup = mapItems.popup;
        let map = MapService.map;
        mapUtils.openPopupPosition(mapItems.getPosition(data), map, mapItems.getInfoContent(data), popup);
      },
      onMouseLeave(mapItems: MapEntities<any>, entity: Entity<any>) {
        mapUtils.setMap(mapItems.popup, null)
      }
    }
  }
  return {
    setMap: true,
    ...dataConfig,
    getItem(data) {
      return mapUtils.getMarker()
    },
    getBounds(item, bounds?) {
      return mapUtils.extendBounds(item, bounds)
    },
    update({item, data}) {
      let position = this.getPosition(data);
      if(position) mapUtils.updatePosition(item, position);
    },
    removeItem(item) {
      mapUtils.clearItem(item);
    },
    removeAll(entities) {
      _.each(entities, (entity: any) => {
        this.removeItem(entity.item)
      });
      this.entities = {}

    },
    setStyle(item) {
      let style = this.styles();
      mapUtils.setStyle(item, style)
    },
    remove(data) {
      let id = data.id;
      if(this.entities[id]) delete this.entities[id];
    },
    ...defaultEventConfig,
    ...config,

  }

};
