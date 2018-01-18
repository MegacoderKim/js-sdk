import { Constructor } from "../interfaces";
import {MapInstance} from "../map-utils/map-instance";

export interface IDivMarkersBase {
  getDivContent: (data) => string;
  getStyle: (type?) => object;
  update(entity): void;
  mapInstance: MapInstance
}

export function DivMarkersMixin<TBase extends Constructor<IDivMarkersBase>>(
  Base: TBase
) {
  return class extends Base {
    getItem(data) {
      return this.mapInstance.mapUtils.getDivMarker();
    }
    update({ item, data }) {
      let content = this.getDivContent(data);
      this.setContent({ item, content });
      super.update({ item, data });
    }

    setContent({ item, content }) {
      this.mapInstance.mapUtils.setDivContent(item, content, this.getStyle());
    }
    setStyle(item) {
      // let style = this.getStyle();
      // GlobalMap.mapUtils.setDivMarkerStyle(item, style)
    }
  };
}
