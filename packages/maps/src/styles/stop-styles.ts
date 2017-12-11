import {Color} from "ht-utility";
import {point} from "leaflet";

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
    },
    popup: {
      disableAutoPan: true,
      pixelOffset: new google.maps.Size(0, -10)
    }
  },
  leaflet: {
    default: {
      radius: 10,
      fillColor: Color.stop,
      fillOpacity: 1,
      weight: 2,
      color: Color.stopDark,
      pane: 'markerPane'
    },
    popup: {
      offset: point(0, -5),
      closeButton: false
    }
  }
};