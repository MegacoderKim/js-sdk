import {GoogleMapUtils} from "./google-map-utils";
import {filter} from "rxjs/operators";
import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {LeafletUtils} from "./leaflet-map-utils";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {LightColorMapStyle} from "../styles/light-color-map";
import {GlobalMap} from "../global/map-service";

export class MapInstance {
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
  googleMapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    fullscreenControl: false,
    streetViewControl: false,
    styles: LightColorMapStyle
  };
  leafletMapOptions = { center: [3.505, 0], zoom: 2 };
  constructor() {
    this.map$.subscribe(map => {
      this.map = map;
    })
  }
  addToItemsSet(item) {
    const i = this.itemsSet.indexOf(item);
    if (i == -1) this.itemsSet.push(item);
  }

  renderMap(elem: Element, options = {}) {
    let mapOptions =
      this.mapType == "leaflet"
        ? this.leafletMapOptions
        : this.googleMapOptions;
    let map = this.mapUtils.renderMap(elem, {
      ...mapOptions,
      ...options
    });
    this.setMap(map);
    return map;
  }

  setMap(map: HtMap | null) {
    this.map$.next(map);
  }
  inValidateSize() {
    this.mapUtils.invalidateSize(this.map);
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
    return items.reduce(
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