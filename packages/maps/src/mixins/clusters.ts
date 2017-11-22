import {Entities} from "../entities/interfaces";
import {MapService} from "../map-service";
import * as _ from "underscore";

const mapUtils = MapService.mapUtils;

export class Clusters {
  toSetMap: boolean = false;
  cluster;
  entities: Entities<any>;
  map;

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
}