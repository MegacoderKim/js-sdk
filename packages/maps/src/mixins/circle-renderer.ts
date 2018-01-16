import { Constructor } from "../interfaces";
import { GlobalMap } from "../global/map-service";

export interface ICircleMarkersBase {
  // getStyle: (styleType?) => object;
}

export function CircleMixin<TBase extends Constructor<ICircleMarkersBase>>(Base: TBase) {
  return class extends Base {
    getItem(data) {
      return GlobalMap.mapUtils.getCircleMarker();
    }
  };
}
