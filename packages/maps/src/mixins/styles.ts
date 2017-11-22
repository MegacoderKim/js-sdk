import {StyleObj} from "../helpers/styles-factory";
import {MapService} from "../map-service";
import {Constructor} from "../interfaces";

export class Styles {
  styleObj: StyleObj = {
    google: {
      default: {

      }
    },
    leaflet: {
      default: {

      }
    }
  };

  styleType = 'default';

  getStyle(selectedStyleType: string = 'default') {
    const mapType = MapService.mapUtils.type;
    const mapTypetype = this.styleObj[mapType];
    const styleType = selectedStyleType && mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
    const style = mapTypetype[styleType];
    if(!style) console.error("style type does not exist");
    return this.styleObj[mapType][styleType]
  }
}

export function StyleMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    defaultstyleObj: StyleObj = {
      google: {
        default: {

        }
      },
      leaflet: {
        default: {

        }
      }
    };
    styleObj: StyleObj;
    name;
    styleType: string;

    constructor(...arg: any[]) {
      super(...arg);
    }

    getStyle(selectedStyleType: string = 'default') {
      const mapType = MapService.mapUtils.type;
      const styleObj = this.styleObj || this.defaultstyleObj;
      const mapTypetype = styleObj[mapType];
      // console.log(this.name, "style", selectedStyleType, styleObj, this.styleObj);
      // const styleType = mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
      const style = mapTypetype[selectedStyleType];
      if(!style) console.error("style type does not exist ", this.name, selectedStyleType);
      return style
    }
  }
}