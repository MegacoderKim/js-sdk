import {HeatmapMixin} from "../mixins/heatmap";
import {htAction} from "ht-data";
import { HtPosition } from "ht-data"
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {StyleMixin} from "../mixins/styles";
import {StyleFunct} from "../interfaces";

export class ActionsHeatmap {
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

  getPosition(item): HtPosition {
    return {
      lat: item.completed_place__location[1],
      lng: item.completed_place__location[0],
    }
  }

};

export const ActionsHeatmapTrace = DataObservableMixin(HeatmapMixin(StyleMixin(ActionsHeatmap)));