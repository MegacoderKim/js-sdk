import {HtMapType} from "../map-utils";

export const stylesConfigFactory = (stylesObj, mapType: HtMapType) => {
  return {
    stylesObj,
    stylesType: 'default',
    styles() {
      const styleType = this.stylesType;
      const style = this.stylesObj[mapType][styleType];
      if(!style) console.error("style type does not exist");
      return this.stylesObj[mapType][styleType]
    }
  }
};