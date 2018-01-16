import { GlobalMap } from "../global/map-service";
import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import { HtMap } from "../map-utils/interfaces";

export interface IClusterBase {
  cluster: any;
  entities: Entities<any>;
  map: HtMap;
  removeItem(item): void;
  removeAll(entities): void;
}
export function ClusterMixin<TBase extends Constructor<IClusterBase>>(
  Base: TBase
) {
  return class extends Base {
    constructor(...arg: any[]) {
      super(...arg);
      this.addCluster();
    }

    addCluster() {
      GlobalMap.addCluster(this);
    }

    traceEffect() {
      if (this.cluster) {
        let userMarkerArray = _.values(this.entities as Entities<any>).map(
          userMarker => {
            return userMarker.item;
          }
        );
        GlobalMap.mapUtils.addMarkersToCluster(
          this.cluster,
          userMarkerArray,
          this.map
        );
      }
    }

    getBounds(item, bounds?) {
      return GlobalMap.mapUtils.extendBounds(item, bounds, true);
    }

    removeItem(item) {
      GlobalMap.mapUtils.removeClusterMarker(this.cluster, item);
      super.removeItem(item);
    }

    removeAll(entities) {
      this.cluster && GlobalMap.mapUtils.removeClusterMarkers(this.cluster);
      this.entities = {}
      // super.removeAll(entities);
    }
  };
}
