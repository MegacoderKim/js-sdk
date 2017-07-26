import {HtMapItem} from "./map-item";
import {HtMap} from "./interfaces";

export class HtMarkerItem extends HtMapItem{

  update(data, map: HtMap) {
    let position = this.getPosition(data);
    this.mapUtils.updatePosition(this.item, position);
  }

  getPosition(item) {
    return this.mapUtils.getLatlng(item.position[0], item.position[1])
  }

}