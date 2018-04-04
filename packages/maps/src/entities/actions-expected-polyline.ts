import {AnimationMixin} from "../mixins/animation-renderer";
import {MapInstance} from "../map-utils/map-instance";
import {MarkersMixin} from "../mixins/marker-renderer";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {SegmentPolylines} from "./segment-polylines";
import {TraceMixin} from "../mixins/trace";
import {SingleItemMixin} from "../mixins/single-item";
import {StyleMixin} from "../mixins/styles";
import {Entity, StyleFunct} from "../interfaces";
import {HtPosition, ITimeAwarePoint, IPlacelineMod} from "ht-models";
import {TimeAwareAnimation} from "time-aware-polyline";
import {IPathBearingTime} from "ht-models";
import { positionTime } from "../helpers/position-time-helper";
import { Constructor } from "../interfaces";
import {htAction} from "ht-data";
import {Color} from "ht-utility";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";
import {HtBounds} from "ht-map-wrapper";
import {IAction} from "ht-models";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

export class ActionsExpectedPolyline {
  lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };

  styleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {
              strokeColor: Color.grey3,
              strokeOpacity: 0,
              strokeWeight: 5,
              icons: [{
                icon: {
                  path: 'M 0,-1 0,0',
                  strokeOpacity: 1,
                  scale: 4
                },
                offset: '0',
                repeat: '13px'
              }],
            },
            highlight: {
              strokeColor: Color.grey2,
              strokeOpacity: 1,
              strokeWeight: 5
            },
            fade: {
              strokeColor: Color.grey2,
              strokeOpacity: 0.2,
              strokeWeight: 2
            }
          }
        };
        case "leaflet": {
          return {
            default: {
              weight: 5,
              color: Color.grey4,
              opacity: 1,
              dashArray: "7 10"
            },
            highlight: {
              weight: 5,
              color: Color.grey2,
              opacity: 1
            },
            fade: {
              weight: 2,
              color: Color.grey2,
              opacity: 0.2
            }
          }
        }
      }
    },
  };
  name = "action expected polyline";

  constructor(public mapInstance: MapInstance) {}

  isValidMapItems(data) {
    return !!this.getEncodedPath(data)
  }

  getEncodedPath(data: IAction) {
    return data.expected_route;
  };

  getPosition(): HtPosition {
    return {lat: 0, lng: 0}
  }

  setData$: (data$: Observable<IAction[]>) => void
}

export const ActionsExpectedPolylineTrace = DataObservableMixin(
  TraceMixin(ExtendBoundsMixin(
    PolylinesMixin(MarkersMixin(StyleMixin(
      MapItemsMixin(ActionsExpectedPolyline)
    )))))
);

