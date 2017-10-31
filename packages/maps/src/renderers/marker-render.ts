import {EventConfig, RenderConfig} from "../entities/interfaces";
import {HtMapUtils} from "../map-utils";
import {MapUtils} from "../interfaces";
import * as _ from "underscore";
import {MapService} from "../map-service";

export const markerRenderConfigFactory = (config: EventConfig = {}): RenderConfig => {
  let mapUtils: MapUtils = MapService.mapUtils;

  return {
    setMap: true,
    getItem(data) {
      return mapUtils.getMarker()
    },
    getBounds(item, bounds?) {
      return mapUtils.extendBounds(item, bounds)
    },
    update(entity) {
      let position = entity.getPosition();
      if(position) mapUtils.updatePosition(entity.item, position);
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
    ...config
  }

};
