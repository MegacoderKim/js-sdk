import {HtPosition} from "ht-js-data";

export const dataFactory = (config) => {
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
      }
    }
    // return {
    //   data,
    //   ...config
    // }
  }
};

export interface DataFactoryConfig {
  getPosition(): HtPosition
}