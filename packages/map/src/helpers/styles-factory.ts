import {HtMapType} from "../map-utils";

export const stylesConfigFactory = (stylesObj, mapType: HtMapType) => {
  return {
    stylesObj,
    styles(styleType = 'default') {
      return this.stylesObj[mapType][styleType]
    }
  }
};