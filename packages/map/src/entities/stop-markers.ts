import {MapEntities} from "./interfaces";
import {dataFactory} from "../helpers/data-factory";
import {mapItemsFactory} from "../base/map-items-factory";
import {stopStyles} from "../styles/stop-styles";

export const stopFactory = (): MapEntities<any> => {

  let stylesObj = stopStyles;
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
  return mapItemsFactory({data: stop, stylesObj, isCircle: true});
  // return clustersFactory({data: stop, stylesObj, isCircle: true});

};