import { GlobalMap } from "../global/map-service";
import * as _ from "underscore";
import { Constructor, Entities } from "../interfaces";
import {HtBounds, HtMap} from "../map-utils/interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IClusterBase {
  cluster: any;
  entities: Entities<any>;
  mapInstance: MapInstance,
  trace (items: any[], map?: HtMap): void
  // map: HtMap;
  removeItem(item): void;
  removeAll(entities): void;
}
export function ClusterMixin<TBase extends Constructor<IClusterBase>>(
  Base: TBase
) {
  return class extends Base {
    forceExtendBounds = true;
    toNotSetMap = true;
    constructor(...arg: any[]) {
      super(...arg);
      this.addCluster();
    }

    trace(items, map?) {
      if (items && items.length) {
        this.clearAllClusters(items)
      }
      super.trace(items, map);
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
          this.mapInstance.map
        );
      }
    }

    getBounds(item, bounds?): HtBounds {
      return GlobalMap.mapUtils.extendItemBounds(item, bounds, true);
    }

    removeItem(item) {
      GlobalMap.mapUtils.removeClusterMarker(this.cluster, item);
      super.removeItem(item);
    }

    removeAll(entities) {
      this.cluster && GlobalMap.mapUtils.removeClusterMarkers(this.cluster);
      this.entities = {}
      // super.removeAll(entities);
    };

    clearAllClusters(data: any[]) {
      const entitiesCount = Object.keys(this.entities).length;
      if(entitiesCount > 400 && entitiesCount - data.length > 100) {
        this.removeAll(this.entities)
      }
    }
  };
}
