import { htUser } from "ht-data";
import { userDivFactory } from "../helpers/user-div-factory";
import { HtPosition } from "ht-models";
import { StyleFunct } from "../interfaces";
import {
  ItemClassFactoryConfig,
  itemsBaseFactory,
  itemsFactory,
  mapItemsFactory
} from "../base/map-items-factory";
import { point } from "leaflet";
declare const RichMarkerPosition: any;

const usersClustersConfig: ItemClassFactoryConfig = {
  renderConfig: {
    getPosition(data): HtPosition {
      return htUser(data).getPosition();
    },
    getDivContent(data) {
      return userDivFactory(data);
    },
    getInfoContent(data) {
      let string = `<div>
<strong>${data.name}</strong>
<div>${data.display.status_text}</div>
<div>${data.display.sub_status_text}</div>
</div>`;
      return string;
    }
  },
  styleFunct: {
    get(type) {
      switch (type) {
        case "google": {
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
        };
        case "leaflet": {
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
  },
  typeConfig: {
    isDiv: true,
    isCluster: true,
    hasPopup: true,
    hasDataObservable: true
  }
};

export const usersClustersTrace = () => {
  return itemsFactory(usersClustersConfig);
};

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
