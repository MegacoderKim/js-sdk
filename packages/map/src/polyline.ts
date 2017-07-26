import {HtMapItem} from "./map-item";
import {HtMap} from "./interfaces";

export class HtPolyline extends HtMapItem {
  constructor(mapType, options?) {
    super(mapType, options);
    this.item = this.mapUtils.getPolyline()
  }

  update(data, map: HtMap) {
    this.mapUtils.setEncodedPath(this.item, this.getEncodedPath(data))
  }

  getEncodedPath(data) {
    return data.encoded_polyline;
  }

}