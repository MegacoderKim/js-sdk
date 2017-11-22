import {MapService} from "../map-service";
import * as _ from "underscore";
import {Constructor, Entities} from "../interfaces";

export function ClusterMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    cluster;
    entities: Entities<any>;
    map;

    constructor(...arg: any[]) {
      super(...arg);
      this.addCluster();
    }

    addCluster() {
      MapService.addCluster(this)
    }

    traceEffect() {
      if(this.cluster) {
        let userMarkerArray = _.values(this.entities as Entities<any>)
          .map(userMarker => {
            return userMarker.item
          });
        MapService.mapUtils.addMarkersToCluster(this.cluster, userMarkerArray, this.map);
      }

    };

    getBounds(item, bounds?) {
      return MapService.mapUtils.extendBounds(item, bounds, true)
    };

    removeItem(item) {
      MapService.mapUtils.removeClusterMarker(this.cluster, item);
      super['removeItem'](item)
    };

    removeAll(entities) {
      this.cluster && MapService.mapUtils.removeClusterMarkers(this.cluster);
      super['removeAll'](entities);

    };
  }
}