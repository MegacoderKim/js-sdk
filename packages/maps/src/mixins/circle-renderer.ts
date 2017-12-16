import { Constructor } from "../interfaces";
import { MapService } from "../global/map-service";

export interface ICircleMarkersBase {
  // getStyle: (styleType?) => object;
}

export function CircleMixin<TBase extends Constructor<ICircleMarkersBase>>(Base: TBase) {
  return class extends Base {
    getItem(data) {
      return MapService.mapUtils.getCircleMarker();
    }
  };
}
