import {MapService} from "../global/map-service";
import {Constructor, StyleObj} from "../interfaces";

export interface IStyleBase {
  styleObj: StyleObj;
  name?: string;
}
export function StyleMixin <TBase extends Constructor<IStyleBase>>(Base: TBase) {
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
    styleType: string;


    getStyle(selectedStyleType: string = 'default', fallbackStyle?) {
      const mapType = MapService.mapUtils.type;
      const styleObj = this.styleObj || this.defaultstyleObj;
      const mapTypetype = styleObj[mapType];
      // console.log(this.name, "style", selectedStyleType, styleObj, this.styleObj);
      // const styleType = mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
      const style = mapTypetype[selectedStyleType] || fallbackStyle;
      if(!style) console.error("style type does not exist ", this.name, selectedStyleType);
      return style
    }
  }
}


// export class Styles {
//   styleObj: StyleObj = {
//     google: {
//       default: {
//
//       }
//     },
//     leaflet: {
//       default: {
//
//       }
//     }
//   };
//
//   styleType = 'default';
//
//   getStyle(selectedStyleType: string = 'default', fallbackStyle?) {
//     const mapType = MapService.mapUtils.type;
//     const mapTypetype = this.styleObj[mapType];
//     const styleType = selectedStyleType && mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
//     const style = mapTypetype[styleType] || fallbackStyle;
//     if(!style) console.error("style type does not exist");
//     return this.styleObj[mapType][styleType]
//   }
// }