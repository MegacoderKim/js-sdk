import {SingleItemMixin} from "../mixins/single-item";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {TraceMixin} from "../mixins/trace";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {MapInstance} from "../map-utils/map-instance";
import {IAction, IPlace, HtPosition, IActionMod} from "ht-models";
import {Entity, StyleFunct} from "../interfaces";
import {IPathBearingTime} from "ht-models";
import {LatLngBounds} from "leaflet";
import {CircleMixin} from "../mixins/circle-renderer";
import {Color} from "ht-utility";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
declare const RichMarkerPosition: any;
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import {DestinationMap} from "./destination-marker";
import {FollowerMixin, IFollower} from "../mixins/follower";

export class StartMarker implements IFollower{
  mapInstance: MapInstance;
  name =  "Start marker";
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
              stroke: false,
              fillColor: '#9155f4',
              fill: true,
              fillOpacity: 1,
              weight: 3
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

  trace(mapItem) {

  }

  getPosition(data: IAction): HtPosition {
    let place: IPlace = data.started_place;
    if (place) {
      return {lat: place.location.coordinates[1], lng: place.location.coordinates[0]}
    } else {
      return null
    }
  }

};

export const StartMarkerTrace =  ExtendBoundsMixin(
  DataObservableMixin(
    TraceMixin(CircleMixin(MarkersMixin(
      StyleMixin(StartMarker))
    ))
  )
)