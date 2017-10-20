import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";
import {HtSegmentsTrace} from "./segments-trace";
import {IUserData} from "ht-models";
import {usersClustersFactory} from "./entities/users-cluster";
import {LightColorMapStyle} from "./map-styles/light-color";
import {Subject} from "rxjs/Subject";
import {HtMapItem} from "./map-item";
import * as _ from "underscore";
import {ReplaySubject} from "rxjs/ReplaySubject";

export class HtMapClass {
  map: HtMap;
  mapUtils: MapUtils;
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
  map$ = new ReplaySubject();

  constructor(public mapType: HtMapType = 'leaflet', options: HtMapClassOptions = {}) {
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
    // this.initMap(elem, options);
    // this.usersCluster = new UsersCluster(mapType);
    this.usersCluster = usersClustersFactory(this.mapUtils);
    this.segmentTrace = new HtSegmentsTrace(this.mapType);
  }

  initMap(elem: Element, options = {}): HtMap {
    let mapOptions = this.mapType == 'leaflet' ? this.leafletMapOptions : this.googleMapOptions;
    this.map = this.mapUtils.renderMap(elem, {...mapOptions, ...options});
    this.usersCluster.map = this.map;
    this.usersCluster.cluster = this.mapUtils.getMarkerCluster(this.map);
    this.map$.next(this.map);
    return this.map
  }

  tracePlaceline(user: IUserData) {
    this.segmentTrace.trace(user, this.map)
  }

  resetBounds(options?, bounds?: HtBounds) {
    setTimeout(() => {
      let items = [this.segmentTrace, this.usersCluster];
      bounds = this.getBoundsItem(items);
      // bounds = this.segmentTrace.extendBounds(bounds);
      // bounds = this.usersCluster.extendBounds(bounds);
      if(bounds && this.mapUtils.isValidBounds(bounds)) this.setBounds(bounds, options)
    }, 10)

  };

  getBoundsItem(items) {
    let bounds = this.mapUtils.extendBounds();
    return _.reduce(items, (bounds, item: HtMapItem<any>) => {
      return this.getBounds(bounds, item)
    }, bounds)
  }

  getBounds(bounds, item) {
    return item.extendBounds(bounds)
  }

  setBounds(bounds: HtBounds, options?) {
    options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
    this.mapUtils.setBounds(this.map, bounds, options)
  }

  inValidateSize() {
    this.mapUtils.invalidateSize(this.map)
  }
}

export interface HtMapClassOptions {

}