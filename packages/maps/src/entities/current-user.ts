import {htUser} from "ht-data";
import {userDivFactory} from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;
import * as _ from 'underscore';
import {SingleItemMixin} from "../mixins/single-item";
import {DivMarkersMixin} from "../mixins/div-makrers-renderes";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {TraceMixin} from "../mixins/trace";
import {DataObservableMixin} from "../mixins/data-observable";
import {HtPosition} from "ht-data";
import {StyleObj} from "../interfaces";

export class CurrentUser {
  name = "Current user";
  styleObj: StyleObj = {
    google: {
      default: {
        flat: true,
        anchor: RichMarkerPosition.BOTTOM_CENTER,
      }
    },
    leaflet: {
      default: {

      }
    }
  };

  getPosition(data): HtPosition {
    return htUser(data).getPosition()
  };

  getDivContent(data) {
    return userDivFactory(data)

  }
};

// export const CurrentUserTrace = _.compose(
//   SingleItemMixin,
//   DivMarkersMixin,
//   MarkersMixin,
//   StyleMixin,
//   TraceMixin,
//   DataObservableMixin,
// )(CurrentUser);

export const CurrentUserTrace = _.compose(
  SingleItemMixin,
  // PopupMixin,
  // ClusterMixin,
  DivMarkersMixin,
  MarkersMixin,
  StyleMixin,
  TraceMixin,
  DataObservableMixin,
)(CurrentUser);