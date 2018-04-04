// import {Color} from "../../utils/color";
// import {config} from "../config";
// import {HtCurrentUser} from "./ht-js-map/current-user";
// import {IUserPlaceline} from "ht-models";
// import {htPlaceline} from "ht-data";
// import {divIcon, latLng, marker} from "leaflet";
//
// export class CurrentUserMarker extends HtCurrentUser {
//     item: L.Marker = marker([0,0], {
//         // pane: 'tooltipPane',
//         zIndexOffset: 10
//     });
//     // test = L.marker([0,0])
//
//     update({segment, positionBearing}, map: L.Map, userData: IUserPlaceline) {
//       if(segment && htPlaceline().isLive(userData)) {
//         let item = segment;
//         if(item.type == 'trip' && item.location_time_series) {
//           // console.log("current trip");
//           let position = latLng([positionBearing.position[0], positionBearing.position[1]]);
//           this.item.setLatLng(position);
//           let bearing = positionBearing.bearing;
//           this.setIcon(bearing, 'trip');
//           this.setMap(map)
//           // this.test.setLatLng(position);
//         } else if (item.type == 'stop' && item.location) {
//           // console.log("current stop");
//           let coordinate = item.location.geojson.coordinates;
//           let position = latLng([coordinate[1], coordinate[0]]);
//           this.item.setLatLng(position);
//           this.setIcon(0, 'stop');
//           this.setMap(map);
//         }
//       } else {
//         this.clear()
//       }
//
//     }
//
//   clear() {
//     if(this.item) this.mapUtils.clearItem(this.item)
//   }
//
//     getCurrentPosition() {
//       let {lat, lng} = this.item.getLatLng();
//       // let lat = latLng.lat;
//       // let lng = latLng.lng;
//       if(this.item.getElement() && lat && lng) {
//         return [lat, lng]
//       } else {
//         return null
//       }
//     }
//
//
//     private getIcon(bearing: number = 0, type: 'stop' | 'trip'): L.DivIcon {
//         return divIcon({
//             html: this.getDivContent(bearing, type),
//             className: 'current-user-marker',
//             iconSize: [50, 50]
//         })
//     }
//
//     private setIcon(bearing: number = 0, type: 'stop' | 'trip') {
//         this.item.setIcon(this.getIcon(bearing, type))
//     }
//
//     private getDivContent(bearing: number, type: 'stop' | 'trip'): string {
//       let pulseClass = config.toPulse ? 'pulse' : 'pulse-noanim';
//         let icon = `<div id="user-marker">
// <div class="marker">  <svg style="transform: rotateZ(${bearing}deg) scale(0.83); display: ${type == 'trip' ? 'initial' : 'none'}" fill="${Color.blueDark}" viewBox="0 0 96 96"><g><path style="; stroke-width: 4px" d="M51.58,19.16l27.15,54.3a4,4,0,0,1-5.33,5.39l-24.6-12a4,4,0,0,0-3.58,0L22.88,78.41a4,4,0,0,1-5.41-5.35l27-53.9A4,4,0,0,1,51.58,19.16Z"/></g></svg></div>
//   <div style="background: ${type == 'stop' ? Color.stop : Color.blue}" class="${pulseClass}"></div>
// </div>`;
//         return icon
//     }
// }
