import { Constructor } from "../interfaces";
import { MapService } from "../global/map-service";

export function CircleMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    getItem(data) {
      return MapService.mapUtils.getCircleMarker();
    }
  };
}
