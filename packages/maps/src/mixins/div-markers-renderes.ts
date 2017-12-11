import {Constructor} from "../interfaces";
import {MapService} from "../global/map-service";


export interface IDivMarkersBase {
  getDivContent: (data) => string;
  getStyle: (type?) => object;
  update(entity): void
};

export function DivMarkersMixin <TBase extends Constructor<IDivMarkersBase>>(Base: TBase) {
  return class extends Base {

    getItem(data) {
      return MapService.mapUtils.getDivMarker()
    };
    update({item, data}) {
      let content = this.getDivContent(data);
      this.setContent({item, content});
      super.update({item, data})
    };

    setContent({item, content}) {
      MapService.mapUtils.setDivContent(item, content, this.getStyle());
    }
    setStyle(item) {
      // let style = this.getStyle();
      // MapService.mapUtils.setDivMarkerStyle(item, style)
    };
  }
}