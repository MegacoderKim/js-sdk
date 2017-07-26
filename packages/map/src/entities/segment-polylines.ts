import {HtMapItems} from "../map-items";
import {HtSegmentPolyline} from "./segment-polyline";

export class HtSegmentPolylines extends HtMapItems {
  getItem(data) {
    let circle = new HtSegmentPolyline(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}