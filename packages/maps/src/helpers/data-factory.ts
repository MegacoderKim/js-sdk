import {HtPosition} from "ht-data";

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

export interface DataFactoryConfig {
  getPosition(): HtPosition
}