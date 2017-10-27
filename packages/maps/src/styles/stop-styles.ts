import {Color} from "ht-utils";

export const stopStyles = {
  google: {
    default: {
      icon: {
        fillColor: Color.stop,
        fillOpacity: 1,
        strokeColor: Color.stopDark,
        strokeOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeWeight: 2,
      }
    }
  },
  leaflet: {
    default: {
      radius: 10,
      fillColor: Color.stop,
      fillOpacity: 1,
      weight: 1,
      color: Color.stopDark,
      pane: 'markerPane'
    }
  }
};