import {Color} from "ht-js-utils/dist";
import {HtMarkerItem} from "../marker-item";

export class HtStopMarker extends HtMarkerItem{
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

  constructor(mapType, options?) {
    super(mapType, options);
    this.item = this.mapUtils.getCircleMarker()
  }

  getPosition(item) {
    return this.mapUtils.getLatlng(item.location.geojson.coordinates[1], item.location.geojson.coordinates[0])
  }
}