import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
import {HtMapItem} from "../map-item";
import {htUser, HtUser} from "ht-js-data";
import {HtMarkerItem} from "../marker-item";
import {HtBounds, HtMap} from "../interfaces";
import {IUser, IUserAnalytics} from "ht-models";

export class HtUserMarker extends HtMarkerItem<IUser | IUserAnalytics> {


  setItem() {
    this.item = this.mapUtils.getMarker()
  }

  setDataClass(data) {
    return htUser(data)
  }

  getPosition(item) {
    let position = htUser(item).getPosition();
    if(!position) {
      console.log(item, "no pos");
    }
    return position ? this.mapUtils.getLatlng(position) : null
  }

  extendBounds(bounds: HtBounds) {
    bounds = bounds || this.mapUtils.extendBounds();
    return this.mapUtils.extendBounds(this.item, bounds, true);
  }

  highlight(map: HtMap, data) {
    this.setDataClass(data);
    // console.log("highlight");
    this.mapUtils.setFocus(this.item, map, 17, true);
    // this.mapUtils.setMap(this.item, map)
  }

  resetItem() {
    // this.mapUtils.setMap(this.item, null)
  }

}