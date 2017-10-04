import {HtMarkerItem} from "../marker-item";
import {Color} from "ht-js-utils";
import {IEvent} from "ht-models";

export class HtEventMarker extends HtMarkerItem<IEvent>{
  leafletSttyle = {
    radius: 10,
    fillColor: Color.stop,
    fillOpacity: 1,
    weight: 1,
    opacity: 1,
    color: Color.stopDark,
    pane: 'markerPane'
  };

  googleStyle = {
    icon: {
      fillColor: '#fff',
      fillOpacity: 1,
      strokeColor: Color.grey5,
      strokeOpacity: 1,
      path: google.maps.SymbolPath.CIRCLE,
      scale: 4,
      strokeWeight: 3,
    }
  };

  setItem() {
    this.item = this.mapUtils.getCircleMarker()
  }

}