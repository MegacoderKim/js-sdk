import {Color} from "ht-utility";
import {htAction} from "ht-data";
import {HtPosition} from "ht-data";
import {ItemClassFactoryConfig, itemsFactory, mapItemsFactory} from "../base/map-items-factory";
import {point} from "leaflet";


export const actionMarkersConfig: ItemClassFactoryConfig = {
  renderConfig: {
    getPosition(data): HtPosition {
      let posObj = htAction(data).getPositionsObject();
      return posObj ? posObj.position : null

    }
  },
  styleObj: {
    google: {
      default: {
        icon: {
          fillColor: Color.blue,
          fillOpacity: 1,
          strokeColor: Color.grey5,
          strokeOpacity: 1,
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          strokeWeight: 4,
        }
      }
    },
    leaflet: {
      default: {
        radius: 10,
        fillColor: Color.blue,
        fillOpacity: 1,
        weight: 4,
        opacity: 1,
        color: Color.grey5,
        pane: 'markerPane'
      },
      popup: {
        offset: point(0, -5),
        closeButton: false
      }
    }
  },
  name: "Action",
  typeConfig: {
    isCircle: true,
    hasDataObservable: false
  }
};

export const actionsMarkersTrace = () => {
  return itemsFactory(actionMarkersConfig)
}

// export class ActionMarkers {
//   name = "Action";
//   styleObj = {
//     google: {
//       default: {
//         icon: {
//           fillColor: Color.blue,
//           fillOpacity: 1,
//           strokeColor: Color.grey5,
//           strokeOpacity: 1,
//           path: google.maps.SymbolPath.CIRCLE,
//           scale: 7,
//           strokeWeight: 4,
//         }
//       }
//     },
//     leaflet: {
//       default: {
//         radius: 10,
//         fillColor: Color.stop,
//         fillOpacity: 1,
//         weight: 1,
//         opacity: 1,
//         color: Color.stopDark,
//         pane: 'markerPane'
//       }
//     }
//   };
//
//   getPosition(data): HtPosition {
//     let posObj = htAction(data).getPositionsObject();
//     return posObj ? posObj.position : null
//
//   }
// }
// export const ActionMarkersTrace = mapItemsFactory(ActionMarkers, {
//   isCircle: true,
//   hasDataObservable: false
// });
