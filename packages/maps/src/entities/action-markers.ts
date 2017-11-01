import {DataConfig, MapEntities} from "./interfaces";
import {Color} from "ht-utility";
import {htAction} from "ht-data";
import {mapItemsFactory} from "../base/map-items-factory";

export const actionsFactory = (): MapEntities<any> => {

  let stylesObj = {
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

  let dataConfig: DataConfig<any> = {
    getPosition(data) {
      let posObj = htAction(data).getPositionsObject();
      return posObj ? posObj.position : null

    }
  };
  let name = " actions";
  let markers = mapItemsFactory({dataConfig, stylesObj, name});
  return markers
};