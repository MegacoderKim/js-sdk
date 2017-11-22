import {htUser} from "ht-data";
import {MapEntity, mapItemFactory} from "../base/map-item-factory";
import {IUserData} from "ht-models";
import {StyleObj} from "../helpers/styles-factory";
import {MapItemsFactoryConfig} from "../base/map-items-factory";
import {userDivFactory} from "../helpers/user-div-factory";
import {DataConfig} from "./interfaces";
declare var RichMarkerPosition: any;
import * as _ from 'underscore';
import {SingleItemMixin} from "../mixins/single-item";
import {DivMarkersMixin} from "../mixins/div-makrers-renderes";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {TraceMixin} from "../mixins/trace";
import {DataObservableMixin} from "../mixins/data-observable";
import {HtPosition} from "ht-data";
import {PopupMixin} from "../mixins/popup-renderer";
import {ClusterMixin} from "../mixins/clusters";

export const currentUserFactory = (): MapEntity<IUserData> => {
  let dataConfig: DataConfig<any> = {
    getPosition(data) {
      return htUser(data).getPosition()
    },
    getDivContent(data) {
      return userDivFactory(data)

    }
  };
  // let data = dataFactory(dataConfig);
  let stylesObj: StyleObj = {
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
  let config: MapItemsFactoryConfig = {dataConfig, stylesObj, isDiv: true};

  return mapItemFactory(config);
};

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