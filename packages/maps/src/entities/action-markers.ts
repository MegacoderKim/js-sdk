import { Color } from "ht-utility";
import { htAction } from "ht-data";
import { HtPosition } from "ht-models";
import {
  ItemClassFactoryConfig,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import { point } from "leaflet";
import {MarkersMixin} from "../mixins/marker-renderer";
import {MapInstance} from "../map-utils/map-instance";
import {StyleMixin} from "../mixins/styles";
import {CircleMixin} from "../mixins/circle-renderer";
import {Entity, StyleFunct} from "../interfaces";
import {HtBounds} from "../map-utils/interfaces";
import {TraceMixin} from "../mixins/trace";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";

export class ActionMarkers {
  name = "Action";
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {
              icon: {
                fillColor: Color.blue,
                fillOpacity: 1,
                strokeColor: Color.grey5,
                strokeOpacity: 1,
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                strokeWeight: 4,
              }
            }
          }
        }
        case "leaflet": {
          return {
            default: {
              radius: 10,
              fillColor: Color.stop,
              fillOpacity: 1,
              weight: 1,
              opacity: 1,
              color: Color.stopDark,
              pane: 'markerPane'
            }
          }
        }
      }
    },
  };

  constructor(public mapInstance: MapInstance) {}

  getPosition(data): HtPosition {
    let posObj = htAction(data).getPositionsObject();
    return posObj ? posObj.position : null

  }
}

export const ActionMarkersTrace = ExtendBoundsMixin(TraceMixin(CircleMixin(MarkersMixin(StyleMixin(ActionMarkers)))));

