import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../config";
import {InnerMapService} from "../map-container/map.service";
// import {DebugPolylineColorMap, ISdkEvent} from "./trace-events/trace-events.component";
import * as _ from "underscore";
import {ExtendBoundsWithPolyline, SetEncodedPath} from "../../utils/map-utls";
import {BroadcastService} from "../core/broadcast.service";
import {HtLocation} from "ht-models";
// import {latLng, polyline, latLngBounds, popup, circleMarker, Map} from "leaflet";
import {MapInstance} from "ht-maps";
import {EventMarkers, EventMarkersTrace} from "./map-items/event-markers";
import {EventPolyline, EventPolylineTrace} from "./map-items/event-polyline";
import {DebugPolyline, DebugPolylineTrace} from "./map-items/debug-polyline";
import {ISdkEvent, SdkEvents} from "./interfaces";

@Injectable()
export class EventTraceService {
  mapInstance = new MapInstance();
  markers: EventMarkers;
  polyline: EventPolyline;
//   markers: L.CircleMarker[] = [];
//   polyline: L.Polyline = polyline([]);
  selectedEvent: ISdkEvent;
  debugPolylines: DebugPolyline;
  debugPolylinesData: {
    [type: string]: any
  } = {};
  events = SdkEvents;
//   popup: L.Popup = popup();
  constructor(
    private http: HttpClient
  ) {
    this.markers = new EventMarkersTrace(this.mapInstance);
    this.polyline = new EventPolylineTrace(this.mapInstance);
    this.debugPolylines = new DebugPolylineTrace(this.mapInstance)
  }

  getActionDebug(id: string) {
    return this.http.get(`app/v2/actions/${id}/debug/`, this.adminReqOpt())
  }

  private adminReqOpt() {
    return {headers: {'Authorization': `token ${config.adminToken}`}}
  }

  traceEvents(events: ISdkEvent[]) {
    console.log(events);
    this.markers.trace(events);
    this.polyline.trace({id: 'pol', events});
    // this.clear();
    // let latlng = [];
    // _.each(events, (event) => {
    //   let position = this.getPosition(event);
    //   latlng.push(position);
    //   let marker = circleMarker(position, {
    //     radius: 7,
    //     weight: 1,
    //     fillOpacity: 1,
    //     opacity: 0.5,
    //     color: '#000',
    //     fillColor: GetEventColor(event.type),
    //     pane: 'markerPane'
    //   });
    //   marker.bindTooltip(this.getEventContent(event), {
    //     opacity: 1
    //   });
    //   marker.on('mouseover', () => this.setSelectedEvent(event));
    //   marker.addTo(this.mapService.map);
    //   this.markers.push(marker)
    // });
    // this.polyline.setLatLngs(latlng);
    // this.polyline.addTo(this.mapService.map);
    this.setBounds()
  }

  getPosition(event) {
    // return latLng(event.location.geojson.coordinates[1], event.location.geojson.coordinates[0])
  }
  setSelectedEvent(event: ISdkEvent) {
    this.selectedEvent = event;
    console.log(event)
  }

  clear() {
    // _.each(this.markers, (marker) => {
    //   marker.remove()
    // });
    // this.polyline.remove();
    // this.markers = []
  }

  setBounds() {
    this.mapInstance.resetBounds();

    // let bounds = latLngBounds([]);
    // _.each(this.markers, (marker) => {
    //   bounds.extend(marker.getLatLng())
    // });
    // _.each(this.debugPolylines, (polyline) => {
    //   ExtendBoundsWithPolyline(polyline, bounds)
    // });
    // if(bounds.isValid()) this.mapService.map.fitBounds(bounds, {
    //   animate: true,
    //   duration: 1.3,
    //   easeLinearity: 0.2,
    //   paddingTopLeft: [15, 15],
    //   paddingBottomRight: [15, 15]
    // });
  }

  renderPolyline(encodedPolyline: string, type: string) {
    // console.log("enc", encodedPolyline, type);
    const toReset = Object.keys(this.debugPolylinesData).length ? false : true
    const debugPolyline = this.debugPolylinesData[type];
    if (debugPolyline) {
      delete this.debugPolylinesData[type];
    } else {
      this.debugPolylinesData[type] = {
        id: type,
        color: polylinesData[type].color,
        encodedPolyline
      };
    }
    const keys = Object.keys(this.debugPolylinesData);
    // const data = keys.map((key) => {
    //   return {
    //     id: type,
    //     encodedPolyline: encodedPolyline,
    //     color: polylinesData[key].color
    //   }
    // });
    const data = Object.keys(this.debugPolylinesData).map((key) => this.debugPolylinesData[key])
    this.debugPolylines.trace(data);
    if (toReset) this.setBounds();
  }

  hasPolylineType(type): boolean {
    // return false;
    return !!this.debugPolylinesData[type];
  }

  focusEvent(event: ISdkEvent) {
    const id = event ? event.id : null;
    this.markers.setPopup(id)
  }

  processEvents(events: ISdkEvent[]): ISdkEvent[] {
    return _.map(events, (event: ISdkEvent) => {
      if(event.type == 'stop.ended') {
        let id = event.data.stop_id;
        let stopStart = _.find(events, (startStop: ISdkEvent) => {
          if(startStop.type == 'stop.started' && id == startStop.data.stop_id) {
            return true
          } else {
            return false
          }
        });
        if(stopStart) {
          let startCord = event.location.geojson.coordinates;
          let endCord = stopStart.location.geojson.coordinates;
          // let start = latLng(startCord[1], startCord[0]);
          // let end = latLng(endCord[1], endCord[0]);
          // let distance = this.mapService.map.distance(start, end);
          let distance = 0;
          return {...event, stopDistance: distance}
        } else {
          return event
        }

      } else {
        return event
      }
    })
  }
}

export const polylinesData = {
  // 'raw_location_time_series': {
  //   color: "red"
  // },
  'raw_route': {
    color: 'blue'
  },
  // 'merged_location_time_series': {
  //   color: 'grey'
  // },
  'filtered_route': {
    color: 'red'
  },
  'merged_route': {
    color: 'green'
  },
  // 'filtered_location_time_series': {
  //   color: 'orange'
  // }
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
