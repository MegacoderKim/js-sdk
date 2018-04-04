// import {Color} from "../../utils/color";
// import {HtPolyline} from "./polyline";
// import * as _ from "underscore";
// import {MapItems} from "./map-items";
//
// export class HtPolylines extends MapItems{
//     itemEntities: {[id: string]: HtPolyline} = {};
//     isFaded: boolean = false;
//     defaultStyle = {
//         dashArray: '11, 7',
//         color: Color.blueLight,
//         opacity: 1,
//         weight: 5,
//         delay: 1200,
//         pulseColor: Color.blue
//     };
//
//     // setFade(selectedItem, toFade: boolean = true) {
//     //     var selectedMapItem;
//     //     _.each(this.itemEntities, (item: HtPolyline) => {
//     //         if(toFade) {
//     //             if(selectedItem && item.id == selectedItem.id){
//     //                 selectedMapItem = item.item;
//     //               item.setFocus(this.map)
//     //             } else {
//     //               item.isFaded = true;
//     //               item.fadePolyline.addTo(this.map);
//     //               item.fadePolyline.bringToBack();
//     //               //   item.item.remove()
//     //               item.removeSegments()
//     //             }
//     //         } else {
//     //             item.isFaded = false;
//     //             item.renderSegmentsFromData(this.map);
//     //             // item.item.setLatLngs(item.item.getLatLngs());
//     //             // item.item.setS
//     //             item.fadePolyline.remove()
//     //         }
//     //         // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
//     //     });
//     //     // console.log(selectedMapItem);
//     //     if(selectedMapItem) selectedMapItem.bringToFront()
//     // }
//
//     getItem(item) {
//       let options = {
//         defaultStyle: this.defaultStyle
//       }
//         let polyline = new HtPolyline(options);
//         polyline.setStyle(this.defaultStyle);
//         return polyline;
//     }
//
// }
