import {Color} from "ht-js-utils";
import {HtMarkerItem} from "../marker-item";
import {ISegment} from "ht-models";

export class HtStopMarker extends HtMarkerItem<ISegment>{
  leafletStyle = {
    radius: 10,
    fillColor: Color.stop,
    fillOpacity: 1,
    weight: 1,
    color: Color.stopDark,
    pane: 'markerPane'
  };

  googleStyle = {
    icon: {
      fillColor: Color.stop,
      fillOpacity: 1,
      strokeColor: Color.stopDark,
      strokeOpacity: 1,
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeWeight: 2,
    }
  };

  setItem() {
    this.item = this.mapUtils.getCircleMarker()
  }

  getPosition(item) {
    let lat = item.location.geojson.coordinates[1];
    let lng = item.location.geojson.coordinates[0];
    return this.mapUtils.getLatlng({lat, lng})
  }
}