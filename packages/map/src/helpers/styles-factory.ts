import {HtMapType} from "../map-utils";

const defaultStyle = {
  google: {
    default: {

    }
  },
  leaflet: {
    default: {

    }
  }
};

export const stylesConfigFactory = (mapType: HtMapType, stylesObj: Partial<StyleObj> = {}) => {
  stylesObj = {...defaultStyle, ...stylesObj};
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

export interface StyleObj {
  google: {
    default: object,
    [key: string]: object
  },
  leaflet: {
    default: object,
    [key: string]: object
  }
}