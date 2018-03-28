import { Injectable } from '@angular/core';
import {InnerMapService} from "../map-container/map.service";
// import {DebugPolylineColorMap, ISdkEvent} from "./trace-events/trace-events.component";
import * as _ from "underscore";
import {ExtendBoundsWithPolyline, SetEncodedPath} from "../../utils/map-utls";
import {BroadcastService} from "../core/broadcast.service";
import {HtLocation} from "ht-models";
// import {latLng, polyline, latLngBounds, popup, circleMarker, Map} from "leaflet";

@Injectable()
export class EventTraceService {
//   markers: L.CircleMarker[] = [];
//   polyline: L.Polyline = polyline([]);
//   selectedEvent: ISdkEvent;
//   debugPolylines: {
//     [type: string]: L.Polyline
//   } = {};
//   events = SdkEvents;
//   popup: L.Popup = popup();
//   constructor(
//     private mapService: InnerMapService
//   ) {
//
//   }
//
//   traceEvents(events: ISdkEvent[]) {
//     this.clear();
//     let latlng = [];
//     _.each(events, (event) => {
//       let position = this.getPosition(event);
//       latlng.push(position);
//       let marker = circleMarker(position, {
//         radius: 7,
//         weight: 1,
//         fillOpacity: 1,
//         opacity: 0.5,
//         color: '#000',
//         fillColor: GetEventColor(event.type),
//         pane: 'markerPane'
//       });
//       marker.bindTooltip(this.getEventContent(event), {
//         opacity: 1
//       });
//       marker.on('mouseover', () => this.setSelectedEvent(event));
//       marker.addTo(this.mapService.map);
//       this.markers.push(marker)
//     });
//     this.polyline.setLatLngs(latlng);
//     this.polyline.addTo(this.mapService.map);
//     // this.setBounds()
//   }
//
//   getPosition(event) {
//     return latLng(event.location.geojson.coordinates[1], event.location.geojson.coordinates[0])
//   }
//   setSelectedEvent(event: ISdkEvent) {
//     this.selectedEvent = event;
//     console.log(event)
//   }
//
//   clear() {
//     _.each(this.markers, (marker) => {
//       marker.remove()
//     });
//     this.polyline.remove();
//     this.markers = []
//   }
//
//   getEventContent(event: ISdkEvent): string {
//     let stringArray = GetJsonStringArray(event.location);
//     let locationDom = _.reduce(stringArray, (string, strings) => {
//       return `${string}<div><span class="text-muted">${strings[0]}</span>&nbsp;<span>${strings[1]}</span></div>`
//     }, '');
//     locationDom = event.stopDistance ? locationDom + `<div><span class="text-muted">stop distance</span>&nbsp;${event.stopDistance}m</div>` : locationDom;
//     return `
//     <div class="flex-column">
//     <div>${event.type}</div>
//     <div><span class="text-muted">Recorded:</span> ${event.recorded_at}</div>
//     <div><span class="text-muted">Created:</span> ${event.created_at}</div>
//     ${locationDom}
// </div>`
//
//   }
//
//   setBounds() {
//     let bounds = latLngBounds([]);
//     _.each(this.markers, (marker) => {
//       bounds.extend(marker.getLatLng())
//     });
//     _.each(this.debugPolylines, (polyline) => {
//       ExtendBoundsWithPolyline(polyline, bounds)
//     });
//     if(bounds.isValid()) this.mapService.map.fitBounds(bounds, {
//       animate: true,
//       duration: 1.3,
//       easeLinearity: 0.2,
//       paddingTopLeft: [15, 15],
//       paddingBottomRight: [15, 15]
//     });
//   }
//
//   renderPolyline(encodedPolyline: string, type: string) {
//     let debugPolyline = this.debugPolylines[type];
//     if(debugPolyline) {
//       debugPolyline.remove();
//       delete this.debugPolylines[type];
//     } else {
//       let polylinez = polyline([], {
//         color: DebugPolylineColorMap[type] || '#000',
//         opacity: 0.8
//       });
//       SetEncodedPath(polylinez, encodedPolyline);
//       polylinez.addTo(this.mapService.map as Map);
//       this.debugPolylines[type] = polylinez;
//       // this.setBounds();
//     }
//   }
//
//   hasPolylineType(type): boolean {
//     return !!this.debugPolylines[type];
//   }
//
//   focusEvent(event: ISdkEvent) {
//     if(event) {
//       this.popup.setLatLng(this.getPosition(event));
//       this.popup.setContent(this.getEventContent(event));
//       this.popup.openOn(this.mapService.map)
//     } else {
//
//     }
//
//   }
//
//   processEvents(events: ISdkEvent[]): ISdkEvent[] {
//     return _.map(events, (event: ISdkEvent) => {
//       if(event.type == 'stop.ended') {
//         let id = event.data.stop_id;
//         let stopStart = _.find(events, (startStop: ISdkEvent) => {
//           if(startStop.type == 'stop.started' && id == startStop.data.stop_id) {
//             return true
//           } else {
//             return false
//           }
//         });
//         if(stopStart) {
//           let startCord = event.location.geojson.coordinates;
//           let endCord = stopStart.location.geojson.coordinates;
//           let start = latLng(startCord[1], startCord[0]);
//           let end = latLng(endCord[1], endCord[0]);
//           let distance = this.mapService.map.distance(start, end);
//           return {...event, stopDistance: distance}
//         } else {
//           return event
//         }
//
//       } else {
//         return event
//       }
//     })
//   }
}

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

export const SdkEvents = [
  'stop.started',
  'stop.ended',
  'location.changed',
  'action.completed',
  'tracking.ended',
  'tracking.started',
  'activity.changed',
  'activity.started',
  'activity.ended',
  'activity.updated',
  'device.power.changed',
  'device.radio.changed',
  'device.location_config.changed',
  'device.info.changed',
  'device.service.restarted',
  'activity.created',
  'activity.updated',
  'device.power.state',
  'health.info.changed',
  'health.power.changed',
  'health.radio.changed',
  'health.location.changed'
];

export function GetEventColor(type) {
  let n = SdkEvents.indexOf(type);
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}


export interface ISdkEvent {
  type: string,
  user_id: string,
  location: HtLocation,
  recorded_at: string,
  created_at: string,
  stopDistance?: number,
  data: {
    stop_id?: string
  }
}
export interface IDebugPolylines {
  time_aware_polyline: string,
  filtered_time_aware_polyline: string,
  gmaps_time_aware_polyline: string,
  encoded_polyline: string,
  filtered_polyline: string,
  gmaps_polyline: string,
  distance: number,
  filtered_polyline_distance: number,
  gmaps_polyline_distance: number
}

export const DebugPolylineColorMap = {
  'normal': '#d1882f',
  'filtered': '#5547c1',
  'gmap': '#6ab35f',
};
