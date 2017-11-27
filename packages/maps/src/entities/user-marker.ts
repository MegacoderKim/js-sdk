// import {htUser} from "ht-data";
// import {HtMarkerItem} from "../marker-item";
// import {HtBounds, HtMap, SetFocusConfig} from "../interfaces";
// import {IUser, IUserAnalytics} from "ht-models";
//
// export class HtUserMarker extends HtMarkerItem<IUser | IUserAnalytics> {
//
//
//   setItem() {
//     this.item = this.mapUtils.getMarker()
//   }
//
//   // setDataClass(data) {
//   //   return htUser(data)
//   // }
//
//   getPosition(item) {
//     let position = htUser(item).getPosition();
//     if(!position) {
//       console.log(item, "no pos");
//     }
//     return position ? this.mapUtils.getLatlng(position) : null
//   }
//
//   extendBounds(bounds: HtBounds) {
//     bounds = bounds || this.mapUtils.extendBounds();
//     return this.mapUtils.extendBounds(this.item, bounds, true);
//   }
//
//   highlight(map: HtMap, data, config: SetFocusConfig = {}) {
//     this.setDataClass(data);
//     this.mapUtils.setFocus(this.item, map, config);
//     // this.mapUtils.setMap(this.item, map)
//   }
//
//   resetItem() {
//     // this.mapUtils.setMap(this.item, null)
//   }
//
// }