import { htAction} from "ht-data";
import {DateString, HMString, NameCase, TimeString} from "ht-utility";
import {ItemClassFactoryConfig, itemsFactory} from "../base/map-items-factory";
declare const RichMarkerPosition: any;

export const actionsClustersConfig: ItemClassFactoryConfig = {
  renderConfig: {
    getPosition(data) {
      return htAction(data).getPosition();
    },
    getDivContent(action) {
      let icon = `<div class="action-marker flex-row">
<span style="margin: auto">${NameCase(action.type[0])}</span>
</div>`;
      return icon
    },
    getInfoContent(item) {
      function htShow(item, style = "flex") {
        return `display: ${item ? style : "none"}`;
      }
      let userName = item.user ? item.user.name : '';
      return `<div class="flex-column flex-center" style="min-width: 180px">
<div class="">
    <div class="text-center">${NameCase(item.type)}
    <span style="${htShow(item.display.duration_remaining && !item.display.show_summary)}"> in ${HMString(item.display.duration_remaining/60)}</span>
    <span style="${htShow(!!item.completed_at)}"> completed at ${TimeString(item.completed_at)}</span>
   
    </div>
</div>
    <div class="text-muted text-center" style="${htShow(!!item.completed_at)}"> ${DateString(item.completed_at)}</div>
<div class="text-center">${NameCase(userName)}<span style="${htShow(!!item.lookup_id, 'block')}"> | #${item.lookup_id}</span></div>
</div>`
    }
  },
  typeConfig: {
    isDiv: true,
    isCluster: true,
    hasPopup: true,
    hasDataObservable: true
  },
  styleFunct: {
    get(type) {
      switch (type) {
        case "leaflet": {
          return {
            default: {
              iconAnchor: [12, 12]
              // iconSize: [35, 35],
              // className: 'current-action-marker',
              // iconAnchor: point(15, 43)
              // iconAnchor: [15, 43]
            },
            popup: {
              // offset: point(0, -35),
              offset: [0, -5],
              closeButton: false
            }
          }
        }
        case "google": {
          return {
            default: {
              flat: true,
              anchor: RichMarkerPosition.MIDDLE,
              zIndex: 1
            },
            popup: {
              pixelOffset: new google.maps.Size(0, -5),
            }
          }
        }
      }
    }
  },
};

export const actionClustersTrace = () => {
  return itemsFactory(actionsClustersConfig);
};
