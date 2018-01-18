import { ReplaySubject } from "rxjs/ReplaySubject";
import { LeafletUtils } from "../map-utils/leaflet-map-utils";
import { GoogleMapUtils } from "../map-utils/google-map-utils";
import {HtBounds, HtMap, HtMapType, MapUtils} from "../map-utils/interfaces";
import * as _ from "underscore";
import {filter} from "rxjs/operators";

export class GlobalMapService {
  mapUtils: MapUtils = null;
  map: HtMap | null = null;
  map$: ReplaySubject<HtMap | null> = new ReplaySubject();
  clusters = [];
  itemsSet = [];
  mapType: HtMapType;
  leafletSetBoundsOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {};

  constructor() {
    this.map$.subscribe(map => {
      this.map = map;
    })
  }
  addToItemsSet(item) {
    const i = this.itemsSet.indexOf(item);
    if (i == -1) this.itemsSet.push(item);
  }
  setMap(map: HtMap | null) {
    this.map$.next(map);
  }
  // getMap() {
  //   this.map$.take(1).subscribe(map => {
  //     return map;
  //   });
  // }
  setMapType(mapType: HtMapType) {
    this.mapType = mapType;
    this.mapUtils = mapType == "leaflet" ? LeafletUtils : GoogleMapUtils;
  }
  addCluster(cluster) {
    if (!this.clusters.includes(cluster)) {
      this.clusters.push(cluster);
      this.map$.pipe(
        filter(data => !!data)
      )
        .subscribe((map: HtMap) => {
          cluster.cluster = this.mapUtils.getMarkerCluster(map);
        });
    }
  }
  getBounds(bounds, item) {
    return item.extendBounds(bounds);
  }
  getItemsSetBounds(items: any[]) {
    let bounds = this.mapUtils.extendItemBounds();
    return _.reduce(
      items,
      (bounds, item) => {
        return this.getBounds(bounds, item);
      },
      bounds
    );
  }
  resetBounds(bounds?: HtBounds, options?, map?) {
    setTimeout(() => {
      let items = this.itemsSet;
      bounds = this.getItemsSetBounds(items);
      if (bounds && this.mapUtils.isValidBounds(bounds))
        this.setBounds(bounds, options, map);
    }, 10);
  }

  setBounds(bounds: HtBounds, options?, map?) {
    map = map || this.map;
    if (!map) return false;
    options =
      options || this.mapType == "leaflet"
        ? this.leafletSetBoundsOptions
        : this.googleSetBoundsOptions;
    this.mapUtils.setBounds(map || this.map, bounds, options);
  }
}

export const GlobalMap = new GlobalMapService();

