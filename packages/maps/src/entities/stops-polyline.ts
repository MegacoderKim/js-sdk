import {TraceMixin} from "../mixins/trace";
import {PolylinesMixin} from "../mixins/polyline-renderer";
import {MapItemsMixin} from "../mixins/map-items";
import {StyleMixin} from "../mixins/styles";
import {segmentPolylineStyles} from "../styles/segment-polyline-styles";
import {Entity, StyleFunct} from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";
import {IEventSub, HtCustomEvent, Color} from "ht-utility";
import { IPathBearingTime, HtPosition, IPlaceline} from "ht-models";

export class StopsPolyline {
  highlightedId: string;
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
              weight: 3,
              color: Color.stopDark,
              opacity: 1
            },
            highlight: {
              weight: 4,
              color: Color.stopDark,
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
  trace: (placelines: IPlaceline[]) => void;

  constructor(public mapInstance: MapInstance) {}

  getEncodedPath(data: IPlaceline) {
    return data.route;
  }
}

export const StopsPolylineTrace = TraceMixin(
  PolylinesMixin(
    StyleMixin(
      MapItemsMixin(StopsPolyline)
    )
  )
)