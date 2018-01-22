import { Constructor, StyleFunct } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IStyleBase {
  styleFunct: StyleFunct;
  name?: string;
  mapInstance: MapInstance
}
export function StyleMixin<TBase extends Constructor<IStyleBase>>(Base: TBase) {
  return class extends Base {
    defaultstyleFunct: StyleFunct = {
      get(type) {
        return {
          default: {}
        }
      }
    };
    styleType: string;

    styleObj: object;

    constructor(...args: any[]) {
      super(...args);
    }

    getStyle(selectedStyleType: string = "default", fallbackStyle?) {
      const mapType = this.mapInstance.mapUtils.type;
      const styleFunct = this.styleFunct || this.defaultstyleFunct;
      const mapTypetype = this.styleObj || styleFunct.get(mapType);
      // console.log(this.name, "style", selectedStyleType, styleFunct, this.styleFunct);
      // const styleType = mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
      const style = mapTypetype[selectedStyleType] || fallbackStyle;
      if (!style)
        console.error(
          "style type does not exist ",
          this.name,
          selectedStyleType
        );
      return style;
    }

    setStyleType(styleType: string = 'default') {
      this.styleType = styleType;
    }


    setStyle(item) {
      let style = this.getStyle(this.styleType);
      this.mapInstance.mapUtils.setStyle(item, style);
    }
  };
}

// export class Styles {
//   styleFunct: StyleFunct = {
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
//     const mapType = GlobalMap.mapUtils.type;
//     const mapTypetype = this.styleFunct[mapType];
//     const styleType = selectedStyleType && mapTypetype[selectedStyleType] ? selectedStyleType : this.styleType;
//     const style = mapTypetype[styleType] || fallbackStyle;
//     if(!style) console.error("style type does not exist");
//     return this.styleFunct[mapType][styleType]
//   }
// }
