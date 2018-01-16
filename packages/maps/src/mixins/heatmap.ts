import { Constructor, Entities } from "../interfaces";
import { HtPosition } from "ht-models";
import { GlobalMap } from "../global/map-service";
import {leafletHeat} from "../map-utils/leaflet.heatmap";

export interface IHeatmapBase {
  getStyle: (styleType?) => object;
  getPosition: (data) => HtPosition;
}

export function HeatmapMixin<TBase extends Constructor<IHeatmapBase>>(
  Base: TBase
) {
  return class extends Base {
    map;
    heatmap;

    constructor(...args: any[]) {
      super(...args);
      let style = this.getStyle(GlobalMap.mapUtils.mapType);
      this.heatmap = GlobalMap.mapUtils.getHeatmap(style);
    }

    trace(items: any[], map?) {
      this.map = map || GlobalMap.map;
      if (this.map) {
        if(items) {
          let latLngs = items.reduce((acc, item) => {
            let position = this.getPosition(item);
            return position ? [...acc, position] : acc;
          }, []);
          GlobalMap.mapUtils.updateHeatMapLatlng(latLngs, this.heatmap);
          GlobalMap.mapUtils.setMap(this.heatmap, this.map)
        } else {
          this.clear()
        }
      } else {
        console.warn("Map is not initialized");
        return false;
      }
    }

    clear() {
      this.trace([])
    }
  };
}
