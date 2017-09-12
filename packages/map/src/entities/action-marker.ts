import {HtMarkerItem} from "../marker-item";
import { Color } from "ht-js-utils";
import { htAction } from "ht-js-data";
import { IAction } from "ht-models";

export class HtActionMarker extends HtMarkerItem {
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
      fillColor: Color.blue,
      fillOpacity: 1,
      strokeColor: Color.grey5,
      strokeOpacity: 1,
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      strokeWeight: 4,
    }
  };

  setItem() {
    this.item = this.mapUtils.getCircleMarker()
  }

  setDataClass(action) {
    return htAction(action)
  }

  getPosition(data: IAction) {
    let position = this.dataClass.getPositionsObject().position;
    return this.mapUtils.getLatlng(position)
  }
}