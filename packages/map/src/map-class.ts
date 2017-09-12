import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";
import {HtSegmentsTrace} from "./segments-trace";
import {IUserData} from "ht-models";
import {UsersCluster} from "./entities/users-cluster";

export class HtMapClass {
  map: HtMap;
  mapUtils: MapUtils;
  segmentTrace: HtSegmentsTrace;
  usersCluster
  leafletSetBoundsOptions: L.PanOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {

  };
  googleMapOptions = {
    center: {lat: 0, lng: 0}, zoom: 2,
    fullscreenControl: false,
    streetViewControl: false
  };
  leafletMapOptions = {center: [3.505, 0], zoom: 2};

  constructor(public mapType: HtMapType = 'leaflet', options = {}) {
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
    // this.initMap(elem, options);
    this.usersCluster = new UsersCluster(mapType);
    this.segmentTrace = new HtSegmentsTrace(this.mapType);
  }

  initMap(elem: Element, options = {}): HtMap {
    let mapOptions = this.mapType == 'leaflet' ? this.leafletMapOptions : this.googleMapOptions;
    this.map = this.mapUtils.renderMap(elem, {...mapOptions, ...options});
    this.usersCluster.markerCluster = this.mapUtils.getMarkerCluster(this.map);
    return this.map
  }

  tracePlaceline(user: IUserData) {
    this.segmentTrace.trace(user, this.map)
  }

  resetBounds(options?, bounds?: HtBounds) {
    bounds = this.segmentTrace.extendBounds(bounds);
    bounds = this.usersCluster.extendBounds(bounds);
    if(bounds && this.mapUtils.isValidBounds(bounds)) this.setBounds(bounds, options)
  };

  setBounds(bounds: HtBounds, options?) {
    options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
    this.mapUtils.setBounds(this.map, bounds, options)
  }

  inValidateSize() {
    this.mapUtils.invalidateSize(this.map)
  }
}