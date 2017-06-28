import {LeafletUtils} from "./leaflet-map-utils";
import {HtBounds, HtMap, MapUtils} from "../interfaces";

export class HtMapItem {
  item: any;
  data: any;
  isFaded: boolean = false;
  isOld: boolean = false;
  id: string | number;
  defaultStyle = {};
  mapUtils: MapUtils;

  constructor(mapUtils: MapUtils = LeafletUtils, defaultStyle?) {
    if(defaultStyle) this.defaultStyle = defaultStyle;
    this.mapUtils = mapUtils
  }

  update(item, map: HtMap) {

  }

  updateItem(data) {
    this.id = data.id;
    this.data = data;
    this.isOld = false;
  }

  extendBounds(bounds: HtBounds) {
    return this.mapUtils.extendBounds();
  }

  setMap(map) {
    this.mapUtils.setMap(this.item, map)
  }

  clear() {
    this.mapUtils.clearItem(this.item)
  }

  setStyle(style) {
    this.mapUtils.setStyle(this.item, {...this.defaultStyle, style})
  }

}