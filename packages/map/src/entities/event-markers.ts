import {HtMapItems} from "../map-items";
import {HtEventMarker} from "./event-marker";
import {IEvent} from "ht-models";

export class HtEventMarkers extends HtMapItems<IEvent>{
  getItem(data) {
    let circle = new HtEventMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}