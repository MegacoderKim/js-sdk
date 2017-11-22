import {StyleObj} from "../helpers/styles-factory";
import {MapService} from "../map-service";

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