import {HtMapItem} from "./map-item";
import {HtMap} from "./interfaces";

export class HtMarkerItem extends HtMapItem{
  tooltipOption = {};

  updatePosition(item, position, content) {
    console.log(this.mapUtils);
    if(position) this.mapUtils.updatePosition(item, position, content, this.tooltipOption)
  }

  setFocus(map: HtMap) {
    this.mapUtils.setFocus(this.item, map)
  }

  setPositionBearing(position, bearing, map) {

  }

}