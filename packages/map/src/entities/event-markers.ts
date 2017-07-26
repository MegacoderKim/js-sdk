import {HtMapItems} from "../map-items";
import {HtEventMarker} from "./event-marker";

export class HtEventMarkers extends HtMapItems{
  getItem(data) {
    let circle = new HtEventMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}