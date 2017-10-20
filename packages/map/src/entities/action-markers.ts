import {IAction} from "ht-models";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {stylesConfigFactory} from "../helpers/styles-factory";
import {dataFactory} from "../helpers/data-factory";
import {entityTraceFactory} from "../helpers/entity-trace";
import {MapEntities} from "./interfaces";
import {MapUtils} from "../interfaces";
import {Color} from "ht-js-utils";
import {htAction} from "ht-js-data";

export const actionsFactory = (mapUtils: MapUtils): MapEntities<any> => {
  let state = {
    map: null,
  };
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
  let stylesConfig = stylesConfigFactory(stylesObj, mapUtils.type);
  let renderConfig = markerRenderConfigFactory(mapUtils);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };
  let stop = dataFactory({
    getPosition(data) {
      let posObj = htAction(data).getPositionsObject();
      return posObj ? posObj.position : null

    }
  });
  let entityTrace = entityTraceFactory(mapUtils, mapItems, stop);

  return {
    name: 'stop',
    ...entityTrace,
    ...state,
    ...renderConfig,
    ...stylesConfig
  }
};