import {HtMapItem} from "./map-item";
import {HtMap} from "./interfaces";

export class HtMarkerItem extends HtMapItem{

  update(data, map: HtMap) {
    let position = this.getPosition(data);
    this.mapUtils.updatePosition(this.item, position);
  }

  getPosition(item) {
    let lat = item.position[0];
    let lng = item.position[1];
    return this.mapUtils.getLatlng({lat, lng})
  }

}