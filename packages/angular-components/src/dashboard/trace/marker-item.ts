import {HtMapItem} from "./ht-js-map/map-item";

export class HtMarkerItem extends HtMapItem{
  tooltipOption = {};

  updatePosition(item, position, content) {
    console.log(this.mapUtils);
    if(position) this.mapUtils.updatePosition(item, position, content, this.tooltipOption)
  }

  setFocus(map: L.Map) {
    if(this.item.getElement()) {
      let center =  this.item.getLatLng();
      map.panTo(center, {animate: true, duration: 1})
    }
  }

  // getInfoContent(item) {
  //   return ""
  // }
  //
  // getPosition(item) {
  //   return this.mapUtils.getLatlng()
  // }

}
