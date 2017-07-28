import {HtMapItems} from "../map-items";
import {HtActionMarker} from "./action-marker";

export class HtActionMarkers extends HtMapItems {
  getItem(data) {
    let circle = new HtActionMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}