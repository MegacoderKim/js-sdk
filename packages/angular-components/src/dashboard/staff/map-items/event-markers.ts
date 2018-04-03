import {PopupMixin, TraceMixin, ExtendBoundsMixin, CircleMixin, MarkersMixin, StyleMixin, MapItemsMixin, MapInstance} from "ht-maps";
import {Color} from "ht-utility";
import {GetJsonStringArray, ISdkEvent} from "../event-trace.service";


export class EventMarkers {
  trace: (events: ISdkEvent[]) => void;
  setPopup: (id) => void;
  styleFunct = {
    get(type) {
      switch (type) {
        case 'google': {
          return {
            default: {
              icon: {
                fillColor: Color.stop,
                fillOpacity: 1,
                strokeColor: Color.stopDark,
                strokeOpacity: 1,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeWeight: 2
              }
            },
            popup: {
              disableAutoPan: true,
              pixelOffset: new google.maps.Size(0, -10)
            },
            highlight: {
              icon: {
                fillColor: Color.stop,
                fillOpacity: 1,
                strokeColor: Color.stopDark,
                strokeOpacity: 1,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeWeight: 2
              }
            },
            fade: {
              icon: {
                fillColor: Color.stop,
                fillOpacity: 0.1,
                strokeColor: Color.stopDark,
                strokeOpacity: 0.2,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeWeight: 2
              }
            },
          }
        };
        case "leaflet": {
          return {
            default: {
              radius: 10,
              fillColor: Color.stop,
              fillOpacity: 1,
              weight: 2,
              color: Color.stopDark,
              pane: "markerPane"
            },
            popup: {
              offset: [0, -5],
              // offset: point(0, -5),
              closeButton: false
            },
            highlight: {
              radius: 10,
              fillColor: Color.stop,
              fillOpacity: 1,
              weight: 4,
              color: Color.stopDark,
              pane: "markerPane"
            },
            fade: {
              radius: 10,
              fillColor: Color.stop,
              fillOpacity: 0.3,
              opacity: 0.4,
              weight: 2,
              color: Color.stopDark,
              pane: "markerPane"
            }
          }
        }
      }
    }
  };
  constructor(public mapInstance: MapInstance) {}

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

  getInfoContent(event: ISdkEvent) {
    let stringArray = GetJsonStringArray(event.location);
    let locationDom = stringArray.reduce((string, strings) => {
      return `${string}<div><span class="text-muted">${strings[0]}</span>&nbsp;<span>${strings[1]}</span></div>`
    }, '');
    locationDom = event.stopDistance ? locationDom + `<div><span class="text-muted">stop distance</span>&nbsp;${event.stopDistance}m</div>` : locationDom;
    return `
    <div class="flex-column">
    <div>${event.type}</div>
    <div><span class="text-muted">Recorded:</span> ${event.recorded_at}</div>
    <div><span class="text-muted">Created:</span> ${event.created_at}</div>
    ${locationDom}
</div>`
  }
};

export const EventMarkersTrace = PopupMixin(
  TraceMixin(ExtendBoundsMixin(CircleMixin(MarkersMixin(StyleMixin(
    MapItemsMixin(EventMarkers)
  )))))
);
