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
    styles(selectedStyleType?: string) {
      const mapTypetype = this.stylesObj[mapType];
      const styleType = selectedStyleType && mapTypetype[selectedStyleType] ? selectedStyleType : this.stylesType;
      const style = mapTypetype[styleType];
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