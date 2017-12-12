import {ReplaySubject} from "rxjs/ReplaySubject";
import {LeafletUtils} from "../map-utils/leaflet-map-utils";
import {GoogleMapUtils} from "../map-utils/google-map-utils";
import {HtBounds, HtMap, HtMapType} from "../map-utils/interfaces";
import * as _ from "underscore";

export const MapService = {
  mapUtils: null,
  map: null,
  map$: new ReplaySubject(),
  clusters: [],
  itemsSet: [],
  addToItemsSet(item) {
    const i = this.itemsSet.indexOf(item);
    if (i == -1) this.itemsSet.push(item)
  },
  setMap(map: HtMap) {
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
      this.clusters.push(cluster);
      MapService.map$.subscribe(map => {
        cluster.cluster = MapService.mapUtils.getMarkerCluster(map);
      });
    }
  },
  getBounds(bounds, item) {
    return item.extendBounds(bounds)
  },
  getItemsSetBounds(items) {
    let bounds = MapService.mapUtils.extendBounds();
    return _.reduce(items, (bounds, item) => {
      return this.getBounds(bounds, item)
    }, bounds)
  },
  resetBounds(bounds?: HtBounds, options?) {
    setTimeout(() => {
      let items = this.itemsSet;
      bounds = this.getItemsSetBounds(items);
      if(bounds && this.mapUtils.isValidBounds(bounds)) this.setBounds(bounds, options)
    }, 10)

  },
  leafletSetBoundsOptions: {
    animate: true,
    duration: 0.3
  },
  googleSetBoundsOptions: {},
  setBounds(bounds: HtBounds, options?) {
    options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
    MapService.mapUtils.setBounds(this.map, bounds, options)
  }

};

MapService.map$.subscribe(map => {
  MapService.map = map;
  // MapService.clusters.forEach(clusterEntity => {
  //   console.log("clust", clusterEntity);
  //   clusterEntity.cluster = MapService.mapUtils.getMarkerCluster(map);
  // });
});