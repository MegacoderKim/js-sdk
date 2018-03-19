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
import {HtPosition, IPathBearingTime, IActionWithPolyline} from "ht-models";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import {TimeAwareAnimation} from "time-aware-polyline";
import {AnimationsEntities, AnimationsEntitiesMixin} from "../mixins/animations-entities";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";
import {HtBounds} from "ht-map-wrapper";

export class ActionsDataPolyline {
  name = "Actions data polyline"
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
  setTimeAwareAnimationEntity: (animationEntity?: AnimationsEntities) => void;

  setData$: (data$: Observable<any[]>) => void;

  constructor(mapInstance: MapInstance) {
    this.mapInstance = mapInstance;
  }

  getTimeAwarePath(data) {
    return data.timeAwarePath;
  }

  getEncodedPositionTime(data: IActionWithPolyline) {
    return data.location_time_series;
  }
  //todo remove this, use getTimeAwarePolyline
  getEncodedPath(data: IActionWithPolyline) {
    return data.encoded_polyline
  }

  getPosition(action: IActionWithPolyline): HtPosition | null {
    const lastLocation =  action.timeAwarePath ? action.timeAwarePath[action.timeAwarePath.length - 1] : null;
    return lastLocation ? {lat: +lastLocation[0], lng: +lastLocation[1]} : null;

  }

  getTimeAwarePolyline(data: IActionWithPolyline) {
    return data.location_time_series
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
  AnimationsEntitiesMixin(
    TraceMixin(ExtendBoundsMixin(PolylinesMixin(MarkersMixin(StyleMixin(
      MapItemsMixin(ActionsDataPolyline)
    )))))
  )
)

// export const ActionsPolylineTrace = DataObservableMixin(AnimationMixin(TraceMixin(PolylinesMixin(StyleMixin(ActionsDataPolyline)))))