import { Constructor } from "../interfaces";
import { GlobalMap } from "../global/map-service";

export interface IDivMarkersBase {
  getDivContent: (data) => string;
  getStyle: (type?) => object;
  update(entity): void;
}

export function DivMarkersMixin<TBase extends Constructor<IDivMarkersBase>>(
  Base: TBase
) {
  return class extends Base {
    getItem(data) {
      return GlobalMap.mapUtils.getDivMarker();
    }
    update({ item, data }) {
      let content = this.getDivContent(data);
      this.setContent({ item, content });
      super.update({ item, data });
    }

    setContent({ item, content }) {
      GlobalMap.mapUtils.setDivContent(item, content, this.getStyle());
    }
    setStyle(item) {
      // let style = this.getStyle();
      // GlobalMap.mapUtils.setDivMarkerStyle(item, style)
    }
  };
}
