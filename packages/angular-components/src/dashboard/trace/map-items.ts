// import {Color} from "../../utils/color";
// import {HtPolyline} from "./polyline";
// import * as _ from "underscore";
// import {HtMapItems} from "./ht-js-map/map-items";
// import {HtMapItem} from "./ht-js-map/map-item";
// import {latLngBounds, popup} from "leaflet";
//
// export class MapItems extends HtMapItems{
//   itemEntities = {};
//   defaultStyle: L.PolylineOptions = {color: Color.blue,
//     opacity: 1,
//     weight: 3,};
//   isFaded: boolean = false;
//   fadeStyle: L.PolylineOptions = {color: Color.grey2};
//   highlightStyle: L.PolylineOptions = {color: Color.grey2};
//   map: L.Map;
//   hereTooltip: L.Popup = popup({
//     closeButton: false,
//     className: 'ht-popup',
//     autoPan: false
//   }).setContent(`<div class="text-center">Here</div>`);
//
//   resetHighlights() {
//     this.onEach((item) => {
//       this.resetHighlight(item)
//     })
//   }
//
//   onEach(cb) {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       cb(item)
//     })
//   }
//
//   unHighlight() {
//     this.onEach((item) => {
//       item.unHighlight(this.map);
//       item.isFaded = true;
//     })
//   }
//
//   highlight(selectedItem, toHighlight: boolean = true) {
//     var currentItem;
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       if(toHighlight) {
//         if(selectedItem && item.id != selectedItem.id) {
//           currentItem = item;
//           this.unHighlightItem(item)
//         } else {
//           this.highlightItem(item)
//         }
//       } else {
//         this.resetHighlight(item)
//       }
//       // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
//     });
//
//   }
//
//
//   // resetFade() {
//   //   this.setFade(null, false)
//   // }
//
//   // highlight(selectedItem, toHighlight: boolean = true) {
//   //   var currentItem;
//   //   _.each(this.itemEntities, (item: HtMapItem) => {
//   //     if(toHighlight) {
//   //       if(selectedItem && item.id != selectedItem.id) {
//   //         currentItem = item;
//   //         item.unHighlight(this.map);
//   //         item.isFaded = true;
//   //       } else {
//   //         item.highlight(this.map);
//   //       }
//   //     } else {
//   //       this.resetItem(item)
//   //     }
//   //     // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
//   //   });
//   //   if(currentItem) currentItem.bringToFront()
//   // }
//
//   // highlight(selectedItem, toHighlight: boolean = true) {
//   //   _.each(this.itemEntities, (item: HtMapItem) => {
//   //     if(toHighlight) {
//   //       (selectedItem && item.id != selectedItem.id) ? this.unhighlightItem(item) : this.highlightItem(item)
//   //     } else {
//   //       this.resetItem(item)
//   //     }
//   //     // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
//   //   })
//   //
//   // }
//
//   openTooltip(selectedItemId: string | null, map) {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       if(selectedItemId) {
//         if(item.id == selectedItemId) {
//           let position = item.item.getLatLng();
//           this.hereTooltip.setLatLng(position).setContent(item.getItemInfoContent()).openOn(map)
//           // this.hereTooltip.openTooltip(item.item.getLatLng())
//           this.hereTooltip.addTo(map)
//         }
//       } else {
//         this.hereTooltip.remove()
//       }
//     })
//   }
//
//   highlightItem(item) {
//     item.highlight(this.map);
//   }
//
//   unHighlightItem(item) {
//     item.unHighlight(this.map);
//     item.isFaded = true;
//   }
//
//   resetItem(item) {
//     item.setStyle(this.defaultStyle);
//     item.item.closeTooltip()
//   }
//
//
//   getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
//     // console.log("get", this.itemEntities);
//     _.each(this.itemEntities, (item: HtPolyline) => {
//       // console.log("item", bounds.getNorthEast());
//       item.getBounds(bounds)
//     });
//     return bounds
//   }
//
//   traceItemEffect(itemEntities: {}) {
//
//   }
//
// }
