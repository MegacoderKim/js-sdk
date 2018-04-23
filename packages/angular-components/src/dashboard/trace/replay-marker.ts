import {SingleItemMixin, TraceMixin, MapItemsMixin, StyleMixin, CircleMixin, MarkersMixin, CurrentUser, PopupMixin} from "ht-maps";
import {HtPosition} from "ht-models";
import {IReplayHead} from "ht-maps";
import {Color, TimeString, NameCase} from "ht-utility";

export class ReplayMarker extends CurrentUser{
  name = "replay marker";
  styleObj = {
    default: {
      radius: 6,
      fillColor: Color.greenDark,
      fillOpacity: 1,
      weight: 2,
      color: 'black',
      pane: "markerPane"
    },
    popup: {
      offset: [0, -5],
      // offset: point(0, -5),
      closeButton: false
    },
    highlight: {
      radius: 10,
      fillColor: Color.stop,
      fillOpacity: 1,
      weight: 4,
      color: Color.stopDark,
      pane: "markerPane"
    },
    fade: {
      radius: 10,
      fillColor: Color.stop,
      fillOpacity: 0.1,
      weight: 2,
      color: Color.stopDark,
      pane: "markerPane"
    }
  }
  getPosition(data: IReplayHead): HtPosition {
    return data.currentPosition;
  };

  getBearing(data: IReplayHead) {
    return data.bearing
  }

  getInfoContent(data: IReplayHead) {
    const time = `<div class="has-text-weight-bold">${TimeString(data.currentTime)}</div>`;
    const activity = data.currentSegment ? `<div>${NameCase(data.currentSegment.type)}</div>` : "";
    return `<div class="flex-column justify-center text-center">${time}${activity}</div>`
  }
};

export const ReplayMarkerTrace = SingleItemMixin(CircleMixin(
  PopupMixin(
    TraceMixin(MarkersMixin(StyleMixin(
      MapItemsMixin(ReplayMarker)
    )))
  )
));

// import {SetMap} from "../../utils/map-utls";
// import {Color} from "../../utils/color";
// import {HtMarkerItem} from "./ht-js-map/marker-item";
// import {divIcon, marker} from "leaflet";
//
//
// export class ReplayMarker extends HtMarkerItem {
//     item: L.Marker = marker([0,0], {
//         pane: 'popupPane',
//         zIndexOffset: 110
//     });
//     test = marker([0,0]);
//
//     setPositionBearing(position, bearing, map) {
//         this.setIcon(bearing);
//         this.item.setLatLng(position);
//         SetMap(this.item, map)
//     }
//
//     private getIcon(bearing: number = 0): L.DivIcon {
//         return divIcon({
//             html: this.getDivContent(bearing),
//             className: 'current-user-marker',
//             iconSize: [50, 50]
//         })
//     }
//
//     private setIcon(bearing: number = 0) {
//         this.item.setIcon(this.getIcon(bearing))
//     }
//
//     private getDivContent(bearing: number): string {
//         let icon = `<div id="user-marker" style="opacity: 0.7">
// <div class="marker">  <svg style="transform: rotateZ(${bearing}deg) scale(0.83)" fill="${Color.blueDark}" viewBox="0 0 96 96"><g><path style="; stroke-width: 4px" d="M51.58,19.16l27.15,54.3a4,4,0,0,1-5.33,5.39l-24.6-12a4,4,0,0,0-3.58,0L22.88,78.41a4,4,0,0,1-5.41-5.35l27-53.9A4,4,0,0,1,51.58,19.16Z"/></g></svg></div>
// </div>`;
//         return icon
//     }
// }
