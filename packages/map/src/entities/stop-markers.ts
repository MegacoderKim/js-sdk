import {MapUtils} from "../interfaces";
import {MapEntities} from "./interfaces";
import {Color} from "ht-js-utils";
import {dataFactory} from "../helpers/data-factory";
import {markersFactory} from "../base/marker-factory";

export const stopFactory = (mapUtils: MapUtils): MapEntities<any> => {

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
        radius: 10,
        fillColor: Color.stop,
        fillOpacity: 1,
        weight: 1,
        color: Color.stopDark,
        pane: 'markerPane'
      }
    }
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
  return markersFactory(mapUtils, {data: stop, stylesObj});

};