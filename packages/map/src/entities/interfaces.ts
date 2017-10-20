import {HtMapType} from "../interfaces";
import {HtPosition} from "ht-js-data";
import {IUser, Partial, IUserAnalytics} from "ht-models";
import {HtBounds, HtMapUtils} from "../map-utils";

export interface RenderConfig {
  setMap: boolean,
  getItem: (data) => any,
  update:(data) => any,
  remove: (data) => any,
  removeItem: (data) => any,
  removeAll: (data) => any,
  getBounds: (bounds?) => any,
  setStyle: (item) => any,
  onClick(data, item): any,
  traceEffect?(): any
  // onMousein(data): any,
  // onMouseOut(data): any
}

export type DataFactory<T> = (data: T) => DataObj<T>

export type Entities<T> = {
  [id: string]: MapEntity<T>
}
export interface MapEntities<T> extends RenderConfig {
  name?: string
  entities: Entities<T>,
  map?: any,
  styles(mapType: HtMapType): object,
  stylesObj: object,
  stylesType: string;
  // config: RenderConfig,
  // dataClass:  DataObj<T>,
  trace: (data: any[]) => void,
  extendBounds: (bounds) => any
}

export interface DataObj<T> {
  data: T
  getPosition(): HtPosition | null,
  getInfoContent(): string
}

export interface MapEntity<T> extends DataObj<T>{
  item: any,
  isOld: boolean
}

export interface MapEntitiesFactoryConfig<T> {
  renderConfig: Partial<RenderConfig>,
  // styles(mapType: HtMapType, styleType?: 'fade' | 'select'): object,
  dataFactory:  DataFactory<T>
}

export type MapEntitiesFactory<T> = (mapUtils: HtMapUtils, config: MapEntitiesFactoryConfig<T>) => MapEntities<T>

// export const usersMarkersFactory: MapEntitiesFactory<any> = (mapUtils: HtMapUtils, config: MapEntitiesFactoryConfig<any>): MapEntities<any> => {
//   let markerGetItem = (data) => {
//     return null
//   };
//   let renderConfig = {
//     getItem: markerGetItem,
//     setMap: true,
//     remove() {
//
//     },
//     removeAll() {
//
//     },
//     update: (data) => {
//       console.log("update");
//     },
//     onClick: (data) => null,
//     ...config.renderConfig
//   };
//   let entityMarker = entityTraceFactory(mapUtils, renderConfig, config.dataFactory);
//   return  {
//     ...entityTraceFactory(mapUtils, renderConfig, config.dataFactory),
//     styles: config.styles,
//     extendBounds(bounds) {
//       bounds = bounds || mapUtils.extendBounds();
//       let newBounds = _.reduce(this.entities, (bounds, entity) => {
//         return mapUtils.extendBounds(entity.item, bounds, true);
//       }, bounds);
//       return newBounds
//     }
//   }
// };



// export const dataClassFactory = (config: MapEntitiesFactoryConfig<any>): (data) => DataObj<any> => {
//   let mapData = config.mapFuncs;
//   if(config.dataClass) {
//     return config.dataClass;
//   } else {
//     return (data) => {
//       return {
//         data,
//         getPosition() {
//           let data = this.data;
//           return mapData.getPosition(data)
//         },
//         getInfoContent() {
//           let data = this.data;
//           return mapData.getInfoContent(data)
//         }
//       }
//     }
//   }
// };


//example
// export const HHtest = () => {
//   let cc = {
//     styles(a, b) {
//       return {}
//     },
//     dataFactory: htUser,
//     mapUtils: null,
//     renderConfig: {setMap: true}
//   };
//   console.log("adasdasdasd");
//   let user = usersMarkersFactory(GoogleMapUtils, cc);
//   user.map = "has map";
//   user.trace([]);
// };

