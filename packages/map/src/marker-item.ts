import {HtMapItem} from "./map-item";

export class HtMarkerItem extends HtMapItem{
  tooltipOption = {};

  updateMarker(item) {
    let position = this.getPosition(item);
    let content = this.getInfoContent(item);
    if(position) this.mapUtils.updatePosition(item, position, content, this.tooltipOption)
  }

  getInfoContent(item) {
    return ""
  }

  getPosition(item) {
    return this.mapUtils.getLatlng()
  }

}