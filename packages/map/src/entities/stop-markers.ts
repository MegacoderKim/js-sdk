import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
export class HtStopMarkers extends HtMapItems {

  getItem(data) {
    let circle = new HtStopMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}