import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
import {HtMapItem} from "../map-item";
export class HtUserMarker extends HtMapItem {


  setItem() {
    this.item = this.mapUtils.getMarker()
  }

  getPosition(item) {
    return this.mapUtils.getLatlng(item.location.geojson.coordinates[1], item.location.geojson.coordinates[0])
  }
}