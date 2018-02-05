import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {TraceMixin} from "../mixins/trace";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {MapInstance} from "../map-utils/map-instance";
import {IAction, IPlace, HtPosition} from "ht-models";
import {Entity, StyleFunct} from "../interfaces";
import {IPathBearingTime} from "ht-models";
import {LatLngBounds} from "leaflet";
import {CircleMixin} from "../mixins/circle-renderer";
import {Color} from "ht-utility";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
declare const RichMarkerPosition: any;
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

export class DestinationMap {
  mapInstance: MapInstance;
  constructor(mapInstance) {
    this.mapInstance = mapInstance
  }
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case 'google': {
          return {
            default: {
              // flat: true,
              // anchor: RichMarkerPosition.MIDDLE,
              // zIndex: 1
            },
            popup: {
              pixelOffset: new google.maps.Size(0, -5),
            }
          }
        }
        case 'leaflet': {
          return {
            default: {
              opacity: 0.4,
              fillColor: '#9155f4',
              color: '#9155f4',
              fill: true,
              fillOpacity: 1,
              fillRule: 'nonzero',
              weight: 7
              // iconAnchor: [12, 12]
              // iconSize: [35, 35],
              // className: 'current-action-marker',
              // iconAnchor: point(15, 43)
              // iconAnchor: [15, 43]
            },
            popup: {
              // offset: point(0, -35),
              offset: [0, -5],
              closeButton: false
            }
          }
        }
      }
    }
  };

  getPosition(data: IAction): HtPosition {
    let place: IPlace = data.completed_place || data.expected_place;
    if (place) {
      return {lat: place.location.coordinates[1], lng: place.location.coordinates[0]}
    } else {
      return null
    }
  }
};

export const DestinationMarker  = DataObservableMixin(ExtendBoundsMixin(
  TraceMixin(CircleMixin(MarkersMixin(StyleMixin(DestinationMap))))
));