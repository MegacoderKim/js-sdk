import {DataConfig, MapEntities} from "./interfaces";
import {mapItemsFactory} from "../base/map-items-factory";
import {segmentPolylineStyles} from "../styles/segment-polyline-styles";


export const segmentFactory = (): MapEntities<any> => {
  let stylesObj = segmentPolylineStyles;
  let dataConfig: DataConfig<any> = {
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  };
  // let stop = dataFactory({
  //
  // });
  let name = 'segment';
  let segments = mapItemsFactory({isPolyline: true, stylesObj, dataConfig, name});
  return segments;
};