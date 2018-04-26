import { TraceMixin, ExtendBoundsMixin, PolylinesMixin, MarkersMixin, StyleMixin, MapItemsMixin, MapInstance, SingleItemMixin} from "ht-maps";
import {Color} from "ht-utility";
import {StyleFunct} from "ht-maps";

export class DebugPolyline {
  trace: (data: {encodedPolyline: string, id: string}[]) => void;

  styleFunct: StyleFunct = {
    get(type, data) {
      switch (type) {
        case "google": {
          return {
            default: {
              strokeColor: Color.blue,
              strokeOpacity: 1,
              strokeWeight: 5
            },
            highlight: {
              strokeColor: Color.blue,
              strokeOpacity: 1,
              strokeWeight: 5
            },
            fade: {
              strokeColor: Color.grey5,
              strokeOpacity: 0.2,
              strokeWeight: 2
            }
          }
        };
        case "leaflet": {
          return {
            default: {
              weight: 5,
              color: data ? data.color : Color.red,
              opacity: 1
            },
            highlight: {
              weight: 5,
              color: Color.blue,
              opacity: 1
            },
            fade: {
              weight: 4,
              color: Color.grey4,
              opacity: 0.5
            }
          }
        }
      }
    },
  };
  constructor(public mapInstance: MapInstance) {};

  getEncodedPath(data) {
    return data.encodedPolyline
  }
}

export const DebugPolylineTrace = (
  TraceMixin(ExtendBoundsMixin(PolylinesMixin((StyleMixin(
    MapItemsMixin(DebugPolyline)
  )))))
)
