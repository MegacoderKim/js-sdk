import {htUser} from "ht-data";
import {userDivFactory} from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;
import {HtPosition} from "ht-data";
import {StyleObj} from "../interfaces";
import {mapItemsFactory} from "../base/map-items-factory";

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

export const CurrentUserTrace = mapItemsFactory(CurrentUser, {
  isSingleItem: true,
  isDiv: true,
  hasDataObservable: false
});
