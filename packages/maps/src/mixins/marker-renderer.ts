import {Constructor, HtMap, Entities} from "../interfaces";
import {HtPosition} from "ht-data";
import {MapService} from "../map-service";
import * as _ from "underscore";

export function MarkersMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    getStyle: (styleType?) => object;
    entities: Entities<any> = {};
    getPosition: (data) => HtPosition;
    cluster;

    getItem(data) {
      return MapService.mapUtils.getMarker()
    };

    getBounds(item, bounds?) {
      return MapService.mapUtils.extendBounds(item, bounds)
    };

    update({item, data}) {
      let position = this.getPosition(data);
      if(position) MapService.mapUtils.updatePosition(item, position);
    };

    removeItem(item) {
      this.cluster && MapService.mapUtils.removeClusterMarker(this.cluster, item);
      MapService.mapUtils.clearItem(item);
    };

    removeAll(entities) {
      this.cluster && MapService.mapUtils.removeClusterMarkers(this.cluster);
      _.each(entities, (entity: any) => {
        this.removeItem(entity.item)
      });
      this.entities = {}

    };

    setStyle(item) {
      let style = this.getStyle();
      MapService.mapUtils.setStyle(item, style)
    };

    removeData(data) {
      let id = data.id;
      if(this.entities[id]) delete this.entities[id];
    };
  };
}