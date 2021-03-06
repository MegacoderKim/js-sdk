import { htUser } from "ht-data";
import { userDivFactory } from "../helpers/user-div-factory";
import { HtPosition, IUser } from "ht-models";
import {Entity, StyleFunct} from "../interfaces";
import {
  ItemClassFactoryConfig,
  itemsBaseFactory,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import {ExtendBoundsMixin} from "../mixins/extend-bounds";
import {MarkersMixin} from "../mixins/marker-renderer";
import {StyleMixin} from "../mixins/styles";
import {DataObservableMixin, IMarkersArray, SetDataConfig} from "../mixins/data-observable";
import {PopupMixin} from "../mixins/popup-renderer";
import {DivMarkersMixin} from "../mixins/div-markers-renderes";
import {TraceMixin} from "../mixins/trace";
import {ClusterMixin} from "../mixins/clusters";
import {MapInstance} from "../map-utils/map-instance";
import {IPathBearingTime} from "ht-models";
declare const RichMarkerPosition: any;
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {HtBounds} from "ht-map-wrapper";
import {HtCustomEvent, IEventSub} from "ht-utility";
import {MapItemsMixin} from "../mixins/map-items";

export class UsersCluster {
  name = "users cluster";
  styleFunct: StyleFunct = {
    get(type) {
      switch (type) {
        case 'google': {
          return {
            default: {
              flat: true,
              anchor: RichMarkerPosition.BOTTOM_CENTER,
              zIndex: 1
            },
            popup: {
              disableAutoPan: true,
              pixelOffset: new google.maps.Size(0, -35)
            }
          }
        }
        case 'leaflet': {
          return {
            default: {
              // iconAnchor: point(15, 43)
              iconAnchor: [15, 43]
            },
            popup: {
              // offset: point(0, -35),
              offset: [0, -35],
              closeButton: false
            }
          }
        }
      }
    }
  };

  constructor(public mapInstance: MapInstance) {}

  getPosition(data): HtPosition {
    return htUser(data).getPosition();
  };

  getDivContent(data) {
    return userDivFactory(data);
  };

  getInfoContent(data: IUser) {
    let string = `<div>
<strong>${data.name}</strong>
<div>${data.display.status_text}</div>
<div>${data.display.last_updated_text}</div>
</div>`;
    return string;
  }

  traceEffect() {

  }
}

export const UsersClusterTrace = DataObservableMixin(
  PopupMixin(ClusterMixin(TraceMixin(ExtendBoundsMixin(DivMarkersMixin(MarkersMixin(StyleMixin(
    MapItemsMixin(UsersCluster)
  )))))))
);


// export class UsersClusters {
//   name = "Cluster user";
//   styleFunct: StyleFunct = {
//     google: {
//       default: {
//         flat: true,
//         anchor: RichMarkerPosition.BOTTOM_CENTER,
//         zIndex: 1
//       },
//       popup: {
//         disableAutoPan: true,
//         pixelOffset: new google.maps.Size(0, -35)
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
//   };
//
//   getInfoContent(data) {
//     let string = `<div>
// <strong>${data.name}</strong>
// <div>${data.display.status_text}</div>
// <div>${data.display.sub_status_text}</div>
// </div>`;
//     return string
//   }
// }
//
// export const UsersClustersTrace = mapItemsFactory(UsersClusters, {
//   hasPopup: true,
//   isCluster: true,
//   isDiv: true,
//   hasDataObservable: true
// });
