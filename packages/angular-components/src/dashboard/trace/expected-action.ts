// import {IAction, IActionMap} from "ht-models";
// import {HtUpdatePositionTooltip} from "../../utils/map-utls";
// import {Color} from "../../utils/color";
// import {TaskMapIcons} from "../asserts/task-map";
// import {divIcon, latLng, marker, polyline} from "leaflet";
//
// export class ExpectedAction {
//     marker: L.Marker = marker([0,0]);
//     polyline: L.Polyline = polyline([], {
//         opacity: 0.1,
//         fillOpacity: 0.1,
//         weight: 5,
//         color: Color.red
//     });
//     constructor() {
//
//     }
//
//     trace(action: IAction, map: L.Map) {
//         let positions =  this.toDrawExpectedAction(action, map)
//         if(positions) {
//             this.renderExpectedAction(positions, map, action)
//         } else {
//             this.clear()
//         }
//     }
//
//     clear() {
//         this.marker.closeTooltip();
//         this.marker.remove();
//         this.polyline.remove();
//     }
//
//     toDrawExpectedAction(action: IAction, map: L.Map): ActionPositions | false {
//         if(action && action.completed_at && action.expected_place && action.expected_place.location && action.completed_place && action.completed_place.location) {
//             let compLoc = action.completed_place.location.coordinates;
//             let expLoc = action.expected_place.location.coordinates;
//             let position = latLng(compLoc[1], compLoc[0]);
//             let expectedPosition = latLng(expLoc[1], expLoc[0]);
//             let distance = map.distance(position, expectedPosition);
//             if(distance > 500) {
//                 return {position, expectedPosition}
//             } else {
//                 return false
//             }
//         } else {
//             return false
//         }
//
//     }
//
//     private renderExpectedAction(positions: ActionPositions, map: L.Map, action) {
//         HtUpdatePositionTooltip(this.marker, positions.expectedPosition, "Expected location");
//         this.setIcon(this.marker, this.getDivContent(action));
//         this.marker.addTo(map);
//         this.marker.openTooltip();
//         this.polyline.setLatLngs([positions.position, positions.expectedPosition]);
//         this.polyline.addTo(map)
//     }
//
//     private setIcon(mapItem: L.Marker, content: string) {
//         mapItem.setIcon(this.getIcon(content))
//     }
//
//     private getIcon(content: string) {
//         return divIcon({
//             html: content,
//             className: 'current-action-marker',
//             iconSize: [30, 30]
//         })
//     }
//
//     private getDivContent(item: IAction) {
//         let img = TaskMapIcons(item.type);
//         let icon = `<div id="action-marker flex-row">
// <img style="height: 30px" src="${img}" class="auto" alt="">
// </div>`;
//         return icon
//     }
// }
//
// interface ActionPositions {
//     position: L.LatLng,
//     expectedPosition: L.LatLng
// }
