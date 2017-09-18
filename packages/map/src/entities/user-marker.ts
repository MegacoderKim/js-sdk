import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
import {HtMapItem} from "../map-item";
import {htUser, HtUser} from "ht-js-data";
import {HtMarkerItem} from "../marker-item";
import {HtBounds, HtMap} from "../interfaces";
export class HtUserMarker extends HtMarkerItem {


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

  highlight(map: HtMap, dataId) {
    this.setDataClass(this.data);
    // console.log("highlight");
    this.mapUtils.setFocus(this.item, map, 17, true);
    // this.mapUtils.setMap(this.item, map)
  }

  resetItem() {
    // this.mapUtils.setMap(this.item, null)
  }

  getInfoContent() {
    let data = this.data;
    if(this.options.getInfoContent) return this.options.getInfoContent(data);
    let position = htUser(data).getPosition();
    let string = `<div>
<strong>${data.name}</strong>
<div>${data.display.status_text}</div>
<div>${position.lat}, ${position.lng}</div>
<div>${data.display.sub_status_text}</div>
</div>`;
    return string
  }

}