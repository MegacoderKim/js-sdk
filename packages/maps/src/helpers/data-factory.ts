import {HtPosition} from "ht-data";
import {AllDataConfig} from "../entities/interfaces";

export const dataFactory = <T>(config: AllDataConfig<T>) => {
  return (data) => {
    return {
      data,
      getPosition() {
        let data = this.data;
        return config.getPosition ? config.getPosition(data) : null
      },
      getInfoContent() {
        let data = this.data;
        return config.getInfoContent ? config.getInfoContent(data) : null
      },
      getEncodedPath() {
        let data = this.data;
        return config.getEncodedPath ? config.getEncodedPath(data) : null
      },
      getDivContent() {
        let data = this.data;
        return config.getDivContent ? config.getDivContent(data) : null
      }
    }
    // return {
    //   data,
    //   ...config
    // }
  }
};

// export interface MarkerDataFactoryConfig<T> {
//   getPosition(data: T): HtPosition,
//   getInfoContent?(data: T): string,
// }
//
// export interface DivMarkerDataFactoryConfig<T> extends MarkerDataFactoryConfig<T>{
//   // getPosition?(data: T): HtPosition,
//   // getInfoContent?(data: T): string,
//   getDivContent(data: T): string
// }
//
// export interface PolylineDataFactory<T> {
//   getEncodedPath(data: T): string
// }
//
// export interface AllDataFactoryConfig<T> extends Partial<PolylineDataFactory<T>>, Partial<DivMarkerDataFactoryConfig<T>>, Partial<MarkerDataFactoryConfig<T>> {
//
// }
// export type DataFactoryConfig<T> = MarkerDataFactoryConfig<T>
//   | DivMarkerDataFactoryConfig<any>
//   | PolylineDataFactory<any>

// export interface DataFactoryConfig<T> {
//   getPosition?(data: T): HtPosition,
//   getInfoContent?(data: T): string,
//   getEncodedPath?(data: T): string
//   getDivContent?(data: T): string
// }