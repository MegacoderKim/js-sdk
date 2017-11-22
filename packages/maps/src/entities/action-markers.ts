import {Color} from "ht-utility";
import {htAction} from "ht-data";
import * as _ from "underscore";
import {TraceMixin} from "../mixins/trace";
import {StyleMixin} from "../mixins/styles";
import {MarkersMixin} from "../mixins/marker-renderer";
import {CircleMixin} from "../mixins/circle-renderer";
import {HtPosition} from "ht-data";

export class ActionMarkers {
  name = "Action";
  styleObj = {
    google: {
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
    },
    leaflet: {
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
  };

  getPosition(data): HtPosition {
    let posObj = htAction(data).getPositionsObject();
    return posObj ? posObj.position : null

  }
}

export const ActionMarkersTrace = _.compose(
  // PopupMixin,
  CircleMixin,
  MarkersMixin,
  StyleMixin,
  TraceMixin
)(ActionMarkers);