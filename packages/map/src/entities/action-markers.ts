import {HtMapItems} from "../map-items";
import {HtActionMarker} from "./action-marker";
import {IAction} from "ht-models";

export class HtActionMarkers extends HtMapItems<IAction> {
  getItem(data) {
    let circle = new HtActionMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}