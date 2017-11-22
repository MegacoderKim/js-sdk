import {Constructor} from "../interfaces";
import {MapService} from "../map-service";

export function DivMarkersMixin <TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    getDivContent: (data) => string;
    getStyle: (type?) => object;
    superUpdate;
    constructor(...arg) {
      super(...arg);
      this.superUpdate = super['update']
    }

    getItem(data) {
      return MapService.mapUtils.getDivMarker()
    };
    update({item, data}) {
      let content = this.getDivContent(data);
      MapService.mapUtils.setDivContent(item, content);
      this.superUpdate({item, data})
    };
    setStyle(item) {
      let style = this.getStyle();
      MapService.mapUtils.setDivMarkerStyle(item, style)
    };
  }
}