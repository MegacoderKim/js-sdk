import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
import {HtMapItem} from "../map-item";
import {htUser} from "ht-js-data";
import {HtMarkerItem} from "../marker-item";
import {HtBounds, HtMap} from "../interfaces";
export class HtUserMarker extends HtMarkerItem {


  setItem() {
    this.item = this.mapUtils.getMarker()
  }

  getPosition(item) {
    let position = htUser(item).getPosition();
    if(!position) {
      console.log(item, "no pos");
    }
    return position ? this.mapUtils.getLatlng(position.lat, position.lng) : null
  }

  extendBounds(bounds: HtBounds) {
    bounds = bounds || this.mapUtils.extendBounds();
    return this.mapUtils.extendBounds(this.item, bounds, true);
  }

  highlight(map: HtMap) {
    // console.log("highlight");
    this.mapUtils.setFocus(this.item, map, 16, true);
    this.mapUtils.setMap(this.item, map)
  }

  resetItem() {
    this.mapUtils.setMap(this.item, null)
  }

}