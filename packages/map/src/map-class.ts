import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";
import {HtSegmentsTrace} from "./segments-trace";
import {IUserData} from "ht-models";

export class HtMapClass {
  map: HtMap;
  mapUtils: MapUtils;
  segmentTrace: HtSegmentsTrace;
  leafletSetBoundsOptions: L.PanOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {

  };
  constructor(public mapType: HtMapType = 'leaflet', options = {}) {
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
    // this.initMap(elem, options);
    this.segmentTrace = new HtSegmentsTrace(this.mapType);
  }

  initMap(elem: Element, options = {}) {

    this.map = this.mapUtils.renderMap(elem, options)
  }

  tracePlaceline(user: IUserData) {
    this.segmentTrace.trace(user, this.map)
  }

  resetBounds(options?, bounds?: HtBounds) {
    bounds = this.segmentTrace.extendBounds(bounds);
    if(bounds && this.mapUtils.isValidBounds(bounds)) this.setBounds(bounds, options)
  };

  setBounds(bounds: HtBounds, options?) {
    options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
    this.mapUtils.setBounds(this.map, bounds, options)
  }
}