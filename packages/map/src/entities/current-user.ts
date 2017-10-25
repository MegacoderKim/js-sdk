import {htUser} from "ht-js-data";
import {MapEntity, mapItemFactory} from "../base/map-item-factory";
import {IUserData} from "../../../models/src/user";
import {StyleObj} from "../helpers/styles-factory";
import {MarkerFactoryConfig} from "../base/map-items-factory";
import {dataFactory} from "../helpers/data-factory";
import {userDivFactory} from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;

export const currentUserFactory = (): MapEntity<IUserData> => {
  let dataConfig = {
    getPosition(data) {
      return htUser(data).getPosition()
    },
    getDivContent(data) {
      return userDivFactory(data)

    }
  };
  let data = dataFactory(dataConfig);
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
  let config: MarkerFactoryConfig = {data, stylesObj, isDiv: true};

  return mapItemFactory(config);
};