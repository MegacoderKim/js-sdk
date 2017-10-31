import {htUser} from "ht-data";
import {MapEntity, mapItemFactory} from "../base/map-item-factory";
import {IUserData} from "ht-models";
import {StyleObj} from "../helpers/styles-factory";
import {MarkerFactoryConfig} from "../base/map-items-factory";
import {dataFactory, DataFactoryConfig} from "../helpers/data-factory";
import {userDivFactory} from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;

export const currentUserFactory = (): MapEntity<IUserData> => {
  let dataFactoryConfig: DataFactoryConfig<any> = {
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
  let config: MarkerFactoryConfig = {dataFactoryConfig, stylesObj, isDiv: true};

  return mapItemFactory(config);
};