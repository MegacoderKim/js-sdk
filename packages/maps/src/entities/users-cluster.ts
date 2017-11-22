import * as _ from 'underscore';
import {htUser} from "ht-data";
import {userDivFactory} from "../helpers/user-div-factory";
import {ClusterMixin} from "../mixins/clusters";
import {PopupMixin} from "../mixins/popup-renderer";
import {TraceMixin} from "../mixins/trace";
import {StyleMixin} from "../mixins/styles";
import {HtPosition} from "ht-data";
import {MarkersMixin} from "../mixins/marker-renderer";
import {DivMarkersMixin} from "../mixins/div-makrers-renderes";
import {DataObservableMixin} from "../mixins/data-observable";
import {StyleObj} from "../interfaces";
declare const RichMarkerPosition: any;


export class UsersClusters {
  name = "Cluster user";
  styleObj: StyleObj = {
    google: {
      default: {
        flat: true,
        anchor: RichMarkerPosition.BOTTOM_CENTER,
        zIndex: 1
      },
      popup: {
        disableAutoPan: true,
        pixelOffset: new google.maps.Size(0, -35)
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
  };

  getInfoContent(data) {
    let string = `<div>
<strong>${data.name}</strong>
<div>${data.display.status_text}</div>
<div>${data.display.sub_status_text}</div>
</div>`;
    return string
  }
}

export const UsersClustersTrace = _.compose(
  PopupMixin,
  ClusterMixin,
  DivMarkersMixin,
  MarkersMixin,
  StyleMixin,
  TraceMixin,
  DataObservableMixin,
)(UsersClusters);