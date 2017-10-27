import {Entities, RenderConfig} from "../entities/interfaces";
import * as _ from "underscore";
import {MapService} from "../map-service";

export const clusterRenderConfigFactory = (renderConfig: RenderConfig) => {
  // console.log(test);
  let mapUtils = MapService.mapUtils;
  let markerRender = renderConfig;
  return {
    ...markerRender,
    setMap: false,
    update(entity) {
      markerRender.update(entity)
    },
    removeItem(item) {
      mapUtils.removeClusterMarker(this.cluster, item);
      markerRender.removeItem(item)
    },
    removeAll(enities) {
      mapUtils.removeClusterMarkers(this.cluster);
      markerRender.removeAll(enities)
    },
    traceEffect() {
      let userMarkerArray = _.values(this.entities as Entities<any>)
        .map(userMarker => {
          // userMarker = _.filter(userMarker, (userMak))
          return userMarker.item
        });
      mapUtils.addMarkersToCluster(this.cluster, userMarkerArray, this.map);
    },
    getBounds(item, bounds?) {
      return mapUtils.extendBounds(item, bounds, true)
    },
    // setMap: false
  }

};