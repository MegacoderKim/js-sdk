import { ReplaySubject } from "rxjs/ReplaySubject";
import { LeafletUtils } from "../map-utils/leaflet-map-utils";
import { GoogleMapUtils } from "../map-utils/google-map-utils";
import { HtBounds, HtMap, HtMapType } from "../map-utils/interfaces";
import * as _ from "underscore";
import {filter} from "rxjs/operators";

export const GlobalMap = {
  mapUtils: null,
  map: null,
  map$: new ReplaySubject(),
  clusters: [],
  itemsSet: [],
  addToItemsSet(item) {
    const i = this.itemsSet.indexOf(item);
    if (i == -1) this.itemsSet.push(item);
  },
  setMap(map: HtMap | null) {
    this.map$.next(map);
  },
  getMap() {
    this.map$.take(1).subscribe(map => {
      return map;
    });
  },
  setMapType(mapType: HtMapType) {
    this.mapUtils = mapType == "leaflet" ? LeafletUtils : GoogleMapUtils;
  },
  addCluster(cluster) {
    if (!this.clusters.includes(cluster)) {
      this.clusters.push(cluster);
      GlobalMap.map$.pipe(
        filter(data => !!data)
      )
        .subscribe(map => {
        cluster.cluster = GlobalMap.mapUtils.getMarkerCluster(map);
      });
    }
  },
  getBounds(bounds, item) {
    return item.extendBounds(bounds);
  },
  getItemsSetBounds(items: any[]) {
    let bounds = GlobalMap.mapUtils.extendBounds();
    return _.reduce(
      items,
      (bounds, item) => {
        return this.getBounds(bounds, item);
      },
      bounds
    );
  },
  resetBounds(bounds?: HtBounds, options?, map?) {
    setTimeout(() => {
      let items = this.itemsSet;
      bounds = this.getItemsSetBounds(items);
      if (bounds && this.mapUtils.isValidBounds(bounds))
        this.setBounds(bounds, options, map);
    }, 10);
  },

  leafletSetBoundsOptions: {
    animate: true,
    duration: 0.3
  },
  googleSetBoundsOptions: {},
  setBounds(bounds: HtBounds, options?, map?) {
    map = map || this.map;
    if (!map) return false;
    options =
      options || this.mapType == "leaflet"
        ? this.leafletSetBoundsOptions
        : this.googleSetBoundsOptions;
    GlobalMap.mapUtils.setBounds(map || this.map, bounds, options);
  }
};

GlobalMap.map$.subscribe(map => {
  GlobalMap.map = map;
  // GlobalMap.clusters.forEach(clusterEntity => {
  //   console.log("clust", clusterEntity);
  //   clusterEntity.cluster = GlobalMap.mapUtils.getMarkerCluster(map);
  // });
});
