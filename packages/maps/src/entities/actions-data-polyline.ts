import {Constructor, Entity, StyleFunct} from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {AnimationMixin} from "../mixins/animation-renderer";
import {TraceMixin} from "../mixins/trace";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {StyleMixin} from "../mixins/styles";
import {IAction} from "ht-models";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {MarkersMixin} from "../mixins/marker-renderer";
import {HtPosition, IPathBearingTime} from "ht-models";
import {LatLngBounds} from "leaflet";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import {TimeAwareAnimation} from "time-aware-polyline";

export class ActionsDataPolyline {
  mapInstance;
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
              fillColor: '#9155f4',
              color: '#9155f4',
              weight: 5
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
  constructor(mapInstance: MapInstance) {
    this.mapInstance = mapInstance;
  }

  getEncodedPositionTime(data: IAction) {
    return data.time_aware_polyline;
  }

  getEncodedPath(data: IAction) {
    return data.encoded_polyline
  }
  getPosition(action: IAction): HtPosition {
    const position = action.user ?
      action.user.last_location ? action.user.last_location.geojson.coordinates : null
      : null;

    return position ? {lat: position[1], lng: position[0]} : null;

  }
}


// export interface IActionsPolylineBase {
//   mapInstance: MapInstance
//   // getStyle: (styleType?) => object;
// }
//
// export function ActionsPolylineMixin<TBase extends Constructor<IActionsPolylineBase>>(Base: TBase) {
//   return class extends Base {
//     start;
//
//
//
//
//
//   };
// }


export const ActionsPolylineTrace = DataObservableMixin(
  AnimationMixin(
    TraceMixin(ExtendBoundsMixin(PolylinesMixin(MarkersMixin(StyleMixin(ActionsDataPolyline)))))
  )
)

// export const ActionsPolylineTrace = DataObservableMixin(AnimationMixin(TraceMixin(PolylinesMixin(StyleMixin(ActionsDataPolyline)))))