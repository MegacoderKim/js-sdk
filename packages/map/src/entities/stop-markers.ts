import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
import {ISegment} from "ht-models";

export class HtStopMarkers extends HtMapItems<ISegment> {

  getItem(data) {
    let circle = new HtStopMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}