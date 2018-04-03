import {PopupMixin, TraceMixin, ExtendBoundsMixin, PolylinesMixin, MarkersMixin, StyleMixin, MapItemsMixin, MapInstance, SingleItemMixin} from "ht-maps";
import {Color} from "ht-utility";
import {StyleFunct} from "ht-maps";
import {ISdkEvent} from "../event-trace.service";

export class EventPolyline {
  trace: (data: {events: ISdkEvent[], id: string}) => void;
  styleFunct: StyleFunct = {
    get(type) {
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
              color: Color.blue,
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

  getPosition(data: ISdkEvent) {
    if (data.location && data.location.geojson) {
      return {
        lat: data.location.geojson.coordinates[1],
        lng: data.location.geojson.coordinates[0]
      }
    } else {
      return null
    }
  };

  getPath(data) {
    return data.events.map(event => this.getPosition(event)).filter(pos => !!pos)
  }
}

export const EventPolylineTrace = SingleItemMixin(
  TraceMixin((PolylinesMixin(MarkersMixin(StyleMixin(
    MapItemsMixin(EventPolyline)
  )))))
)
