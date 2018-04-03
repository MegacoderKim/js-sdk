import {PopupMixin, TraceMixin, ExtendBoundsMixin, CircleMixin, MarkersMixin, StyleMixin, MapItemsMixin, MapInstance} from "ht-maps";
import {Color} from "ht-utility";
import {ISdkEvent, SdkEvents, GetEventColor} from "../interfaces";
import * as _ from "underscore";

export class EventMarkers {
  trace: (events: ISdkEvent[]) => void;
  setPopup: (id) => void;
  styleFunct = {
    get(type, data) {
      const eventColor = GetEventColor(data.type);
      console.log(eventColor, data, "style");
      switch (type) {
        case 'google': {
          return {
            default: {
              icon: {
                fillColor: eventColor,
                fillOpacity: 1,
                strokeColor: eventColor,
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
                fillColor: eventColor,
                fillOpacity: 1,
                strokeColor: eventColor,
                strokeOpacity: 1,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeWeight: 2
              }
            },
            fade: {
              icon: {
                fillColor: eventColor,
                fillOpacity: 0.1,
                strokeColor: eventColor,
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
              radius: 7,
              fillColor: eventColor,
              fillOpacity: 1,
              weight: 1,
              color: eventColor,
              pane: "markerPane"
            },
            popup: {
              offset: [0, -5],
              // offset: point(0, -5),
              closeButton: false
            },
            highlight: {
              radius: 10,
              fillColor: eventColor,
              fillOpacity: 1,
              weight: 4,
              color: eventColor,
              pane: "markerPane"
            },
            fade: {
              radius: 10,
              fillColor: eventColor,
              fillOpacity: 0.3,
              opacity: 0.4,
              weight: 2,
              color: eventColor,
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

export function GetJsonStringArray(object: object): any[][] {
  let keys = _.keys(object);
  return _.reduce(keys, (acc: [string, string][], key: string) => {
    let type = typeof object[key];
    if(type == 'number' || type == 'string') {
      return [...acc, [key, object[key]]]
    } else {
      return acc
    }
  }, [])
}


