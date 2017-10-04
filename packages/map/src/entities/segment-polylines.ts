import {HtMapItems} from "../map-items";
import {HtSegmentPolyline} from "./segment-polyline";
import {ISegment} from "ht-models";

export class HtSegmentPolylines extends HtMapItems<ISegment> {
  getItem(data) {
    let circle = new HtSegmentPolyline(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}