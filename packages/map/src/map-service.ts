import {ReplaySubject} from "rxjs/ReplaySubject";
import {HtMapType} from "./map-utils";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";

export const MapService = {
  mapUtils: null,
  map: null,
  map$: new ReplaySubject(),
  clusters: [],
  setMap(map) {
    this.map$.next(map)
  },
  getMap() {
    this.map$.take(1).subscribe(map => {
      return map
    })
  },
  setMapType(mapType: HtMapType) {
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
  },
  addCluster(cluster) {
    if(!this.clusters.includes(cluster)) {
      this.clusters.push(cluster)
    }
  }
};

MapService.map$.subscribe(map => {
  MapService.map = map;
  MapService.clusters.forEach(clusterEntity => {
    clusterEntity.cluster = MapService.mapUtils.getMarkerCluster(map);
  });
});