import {HtMapItems} from "../map-items";
import {HtStopMarker} from "./stop-marker";
import {ISegment} from "ht-models";
import {MapUtils} from "../interfaces";
import {Entities, MapEntities} from "./interfaces";
import {Color} from "ht-js-utils";
import {clusterRenderConfigFactory} from "../helpers/cluster-render";
import {markerRenderConfigFactory} from "../helpers/marker-render";
import {circleRenderConfigFactory} from "../helpers/circle-render";
import {entityTraceFactory} from "../helpers/entity-trace";
import {dataFactory} from "../helpers/data-factory";
import {stylesConfigFactory} from "../helpers/styles-factory";

export class HtStopMarkers extends HtMapItems<ISegment> {

  getItem(data) {
    let circle = new HtStopMarker(this.mapType);
    circle.setMapTypeStyle();
    return circle;
  }
}

export const stopFactory = (mapUtils: MapUtils): MapEntities<any> => {
  let state = {
    map: null,
  };
  let stylesObj = {
    google: {
      default: {
        icon: {
          fillColor: Color.stop,
          fillOpacity: 1,
          strokeColor: Color.stopDark,
          strokeOpacity: 1,
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          strokeWeight: 2,
        }
      }
    },
    leaflet: {
      default: {

      }
    }
  };
  let stylesConfig = stylesConfigFactory(stylesObj, mapUtils.type);
  // let styles = (mapType, styleType = 'default') => {
  //   let obj = {
  //     google: {
  //       default: {
  //         icon: {
  //           fillColor: Color.stop,
  //           fillOpacity: 1,
  //           strokeColor: Color.stopDark,
  //           strokeOpacity: 1,
  //           path: google.maps.SymbolPath.CIRCLE,
  //           scale: 8,
  //           strokeWeight: 2,
  //         }
  //       }
  //     },
  //     leaflet: {
  //       default: {
  //
  //       }
  //     }
  //   };
  //   return obj[mapType][styleType]
  // };
  // let clusterRender = clusterRenderConfigFactory(mapUtils, styles);
  let renderConfig = markerRenderConfigFactory(mapUtils);
  // renderConfig = circleRenderConfigFactory(renderConfig, mapUtils);
  let mapItems = {
    ...state,
    entities: {},
    renderer: renderConfig
  };
  let stop = dataFactory({
    getPosition(data) {
      if(data.location && data.location.geojson) {
        let lat = data.location.geojson.coordinates[1];
        let lng = data.location.geojson.coordinates[0];
        return {lat, lng}
      } else {
        return null;
      }

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