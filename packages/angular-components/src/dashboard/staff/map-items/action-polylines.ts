import {ExtendBoundsMixin, MapInstance, MapItemsMixin, PolylinesMixin, StyleMixin, TraceMixin} from "ht-maps";

export class ActionPolylines {
  styleFunct = {
    get(mapType, data) {
      return {
        default: {
          weight: 5,
          color: 'red',
          opacity: 1
        }
      }
    }
  }
  getEncodedPath(data) {
    return data.encodedPolyline
  }
  constructor(public mapInstance: MapInstance) { };
}

export const ActionPolylinesTrace = TraceMixin(ExtendBoundsMixin(PolylinesMixin((StyleMixin(
  MapItemsMixin(ActionPolylines)
)))))
