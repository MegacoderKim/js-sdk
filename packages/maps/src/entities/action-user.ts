import { htUser } from "ht-data";
import { userDivFactory } from "../helpers/user-div-factory";
declare var RichMarkerPosition: any;
import { HtPosition } from "ht-models";
import {Entity, StyleFunct} from "../interfaces";
import {
  ItemClassFactoryConfig,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import { point } from "leaflet";
import {MapInstance} from "../map-utils/map-instance";
import {SingleItemMixin} from "../mixins/single-item";
import {DivMarkersMixin} from "../mixins/div-markers-renderes";
import {TraceMixin} from "../mixins/trace";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {HtBounds} from "../map-utils/interfaces";
import {AnimationMixin} from "../mixins/animation-renderer";
import {TimeAwareAnimation} from "time-aware-polyline";
import {IPathBearingTime} from "ht-models";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";

export class ActionUser {
  name = "action user";
  animation?: TimeAwareAnimation;

  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case "google": {
          return {
            default: {
              flat: true,
              anchor: RichMarkerPosition.BOTTOM_CENTER
            }
          }
        };
        case "leaflet": {
          return {
            default: {
              zIndexOffset: 10,
              iconSize: [60, 60],
              className: "action-marker"
              // iconAnchor: point(15, 43)
              // iconAnchor: [0, 0]
            }
          }
        }
      }
    }
  }

  constructor(public mapInstance: MapInstance) {}

  getPosition(data): HtPosition {
    return htUser(data).getPosition();
  };

  getDivContent(data) {
    const content = `
    <div style="border-radius: 50%; height: 60px; width: 60px; background: rgba(95,143,213,0.67) ">
  <div style="height: 30px; width: 30px; background-image: url('${data.photo}'); background-repeat: no-repeat;
  background-size: cover;     top: 15px;
    position: relative;
    left: 15px;
    border-radius: 50%;"></div>
</div> 
    `;
    return content
  }
}

export const ActionUserTrace = DataObservableMixin(
  ExtendBoundsMixin(
    DivMarkersMixin(
      TraceMixin(MarkersMixin(StyleMixin(ActionUser)))
    )
  )
);
// export class CurrentUser {
//   name = "Current user";
//   styleFunct: StyleFunct = {
//     google: {
//       default: {
//         flat: true,
//         anchor: RichMarkerPosition.BOTTOM_CENTER,
//       }
//     },
//     leaflet: {
//       default: {
//
//       }
//     }
//   };
//
//   getPosition(data): HtPosition {
//     return htUser(data).getPosition()
//   };
//
//   getDivContent(data) {
//     return userDivFactory(data)
//
//   }
// };
//
// export const CurrentUserTrace = mapItemsFactory(CurrentUser, {
//   isSingleItem: true,
//   isDiv: true,
//   hasDataObservable: false
// });
