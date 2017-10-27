import {MapEntities} from "./interfaces";
import {dataFactory} from "../helpers/data-factory";
import {mapItemsFactory} from "../base/map-items-factory";
import {segmentPolylineStyles} from "../styles/segment-polyline-styles";


export const segmentFactory = (): MapEntities<any> => {
  let stylesObj = segmentPolylineStyles;
  let stop = dataFactory({
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  });
  let name = 'segment';
  let segments = mapItemsFactory({isPolyline: true, stylesObj, data: stop, name});
  return segments;
};