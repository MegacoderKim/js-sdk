import {HeatmapMixin} from "../mixins/heatmap";
import { HtPosition, IPlaceHeat } from "ht-models"
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {StyleMixin} from "../mixins/styles";
import {StyleFunct} from "../interfaces";
import {HtBounds} from "../map-utils/interfaces";

export class StopsHeatmap {
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {

            }
          }
        }
        case "leaflet": {
          return {
            default: {
              radius: 7,
              minOpacity: 0.6
            }
          }
        }
      }
    }
  };

  getPosition(item: IPlaceHeat): HtPosition {
    return {
      lat: item.place__location[1],
      lng: item.place__location[0],
      weight: item.intensity
    }
  }

};

export const StopsHeatmapTrace = DataObservableMixin(HeatmapMixin(StyleMixin(StopsHeatmap)));