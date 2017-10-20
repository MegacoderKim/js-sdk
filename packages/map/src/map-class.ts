import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {HtSegmentsTrace} from "./segments-trace";
import {IUserData} from "ht-models";
import {usersClustersFactory} from "./entities/users-cluster";
import {LightColorMapStyle} from "./map-styles/light-color";
import {HtMapItem} from "./map-item";
import * as _ from "underscore";
import {MapService} from "./map-service";
import {ReplaySubject} from "rxjs/ReplaySubject";

export class HtMapClass {
  // map: HtMap;
  // mapUtils: MapUtils;
  segmentTrace: HtSegmentsTrace;
  usersCluster;
  leafletSetBoundsOptions: L.PanOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {

  };
  googleMapOptions = {
    center: {lat: 0, lng: 0}, zoom: 2,
    fullscreenControl: false,
    streetViewControl: false,
    styles: LightColorMapStyle
  };
  leafletMapOptions = {center: [3.505, 0], zoom: 2};
  // clusters = [];
  // map$ = new ReplaySubject();

  constructor(public mapType: HtMapType = 'leaflet', options: HtMapClassOptions = {}) {
    MapService.setMapType(mapType);
    this.usersCluster = usersClustersFactory();
    this.segmentTrace = new HtSegmentsTrace();
  }

  get map$() {
    return MapService.map$
  }

  get map() {
    return MapService.map
  }

  initMap(elem: Element, options = {}): HtMap {
    let mapOptions = this.mapType == 'leaflet' ? this.leafletMapOptions : this.googleMapOptions;
    let map = MapService.mapUtils.renderMap(elem, {...mapOptions, ...options});
    MapService.setMap(map);
    return map
  }

  tracePlaceline(user: IUserData) {
    this.segmentTrace.trace(user)
  }

  resetBounds(options?, bounds?: HtBounds) {
    setTimeout(() => {
      let items = [this.segmentTrace, this.usersCluster];
      bounds = this.getBoundsItem(items);
      if(bounds && MapService.mapUtils.isValidBounds(bounds)) this.setBounds(bounds, options)
    }, 10)

  };

  getBoundsItem(items) {
    let bounds = MapService.mapUtils.extendBounds();
    return _.reduce(items, (bounds, item: HtMapItem<any>) => {
      return this.getBounds(bounds, item)
    }, bounds)
  }

  getBounds(bounds, item) {
    return item.extendBounds(bounds)
  }

  setBounds(bounds: HtBounds, options?) {
    options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
    MapService.mapUtils.setBounds(this.map, bounds, options)
  }

  inValidateSize() {
    MapService.mapUtils.invalidateSize(this.map)
  }
}

export interface HtMapClassOptions {

}