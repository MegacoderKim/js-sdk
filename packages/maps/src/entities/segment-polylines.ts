import {MapEntities} from "./interfaces";
import {dataFactory, DataFactoryConfig} from "../helpers/data-factory";
import {mapItemsFactory} from "../base/map-items-factory";
import {segmentPolylineStyles} from "../styles/segment-polyline-styles";


export const segmentFactory = (): MapEntities<any> => {
  let stylesObj = segmentPolylineStyles;
  let dataFactoryConfig: DataFactoryConfig<any> = {
    getEncodedPath(data) {
      return data.encoded_polyline;
    }
  };
  // let stop = dataFactory({
  //
  // });
  let name = 'segment';
  let segments = mapItemsFactory({isPolyline: true, stylesObj, dataFactoryConfig, name});
  return segments;
};