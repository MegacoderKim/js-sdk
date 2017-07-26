import {HtMap, HtMapType, MapUtils} from "./interfaces";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";
import {HtSegmentsTrace} from "./segments-trace";
import {IUserData} from "ht-models";

export class HtMapClass {
  map: HtMap;
  mapUtils: MapUtils;
  segmentTrace: HtSegmentsTrace;

  constructor(elem: Element, public mapType: HtMapType = 'leaflet', options) {
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
    this.initMap(elem, options);
    this.segmentTrace = new HtSegmentsTrace(this.mapType);
  }

  initMap(elem: Element, options) {

    this.map = this.mapUtils.renderMap(elem, options)
  }

  tracePlaceline(user: IUserData) {
    this.segmentTrace.trace(user, this.map)
  }
}