// import {HtMap, MapUtils} from "./interfaces";
// import * as _ from 'underscore';
// import {HtMapItem} from "./map-item";
// import {LeafletUtils} from "./leaflet-map-utils";
//
// export class HtMapItems {
//   itemEntities: {[id: string]: HtMapItem} = {};
//   defaultStyle = {};
//   fadeStyle = {};
//   map;
//   mapUtils: MapUtils;
//   defaultOptions = {
//     mapType: 'leaflet',
//     defaultStyle: {}
//   };
//
//   constructor(options = {}) {
//     let newoptions = {...this.defaultOptions, ...options};
//     var {defaultStyle, mapType} = newoptions;
//     if(defaultStyle) this.defaultStyle = defaultStyle;
//     this.mapUtils = mapType == 'leaflet' ? LeafletUtils : LeafletUtils;
//   }
//
//   // constructor(mapUtils: MapUtils = LeafletUtils, defaultStyle?) {
//   //   if(this.defaultStyle) this.defaultStyle = defaultStyle;
//   //   this.mapUtils = mapUtils;
//   // }
//
//   traceOnMap(items: any[], map: HtMap) {
//     this.trace(items, map, true)
//   }
//
//   trace(items: any[], map: HtMap, setMap: boolean = false) {
//     this.map = map;
//     if(items && items.length) this.traceItems(items, setMap);
//     this.bustOlditem()
//   }
//
//   getItem(data) {
//     return new HtMapItem();
//   }
//
//   itemEffect(item) {
//
//   }
//
//   traceItemEffect(itemEntities: {}) {
//
//   }
//
//   extendBounds() {
//     let bounds = this.mapUtils.extendBounds();
//     return _.reduce(this.itemEntities, (bounds, item) => {
//       return item.extendBounds(bounds)
//     }, bounds);
//   }
//
//   addClick(cb) {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       item.item.on('click', () => {
//         cb(item.data)
//       })
//     })
//   }
//
//   onHoverIn(cb) {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       item.item.on('mouseover', () => {
//         console.log("mouseover");
//         cb(item.data)
//       })
//     })
//   }
//
//   onHoverOut(cb) {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       item.item.on('mouseout', () => {
//         cb(item.data)
//       })
//     })
//   };
//
//   unHighlight() {
//     this.onEach((item) => {
//       item.unHighlight(this.map);
//       item.isFaded = true;
//     })
//   }
//
//   highlight(selectedItem, toHighlight: boolean = true) {
//     this.onEach((item) => {
//       if(toHighlight) {
//         if(selectedItem && item.id != selectedItem.id) {
//           this.unHighlightItem(item)
//         } else {
//
//           this.highlightItem(item)
//         }
//       } else {
//         this.resetHighlight(item)
//       }
//     })
//   }
//
//   unHighlightItem(item) {
//     item.isFaded = true;
//     item.unHighlight(this.map);
//   }
//
//   highlightItem(item) {
//     item.isHighlighted = true;
//     item.highlight(this.map);
//   }
//
//   setFade(selectedItem, toFade: boolean = true) {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       if(toFade) {
//         // console.log(this.fadeStyle);
//         if(selectedItem && item.id == selectedItem.id){
//           item.bringToFront()
//         } else {
//           item.setStyle(this.fadeStyle)
//         }
//       } else {
//         // console.log(this.defaultStyle);
//         item.setStyle(this.defaultStyle)
//       }
//       // (toFade && item.id == selectedItem.id) ? item.setStyle(this.fadeStyle) : item.setStyle(this.defaultStyle)
//     })
//   }
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
//   resetHighlight(item) {
//     item.isFaded = false;
//     item.isHighlighted = false;
//     item.resetHighlight(this.map)
//   }
//
//   resetItems() {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       this.resetItem(item)
//     })
//   }
//
//   resetItem(item) {
//     item.reset()
//   }
//
//   private bustOlditem() {
//     _.each(this.itemEntities, (item) => {
//       if(item.isOld) {
//         this.removeItem(item);
//       } else {
//         item.isOld = true;
//       }
//     })
//   }
//
//   private traceItems(items: any[], setMap: boolean = false) {
//     let traceItems = [...items];
//     // let lastItem = traceItems.pop();
//     _.each(traceItems, (item) => {
//       if(this.itemEntities[item.id]) {
//         this.updateItem(item, setMap)
//       } else {
//         this.createItem(item, setMap)
//       }
//     });
//     this.traceItemEffect(this.itemEntities);
//     // this.updateItem(lastItem);
//
//   }
//
//   private updateItem(data, setMap: boolean = false) {
//     let mapitem = this.itemEntities[data.id];
//     if(mapitem) {
//       mapitem.updateItem(data);
//       if(setMap) mapitem.setMap(this.map);
//       mapitem.update(data, this.map);
//     } else {
//       this.createItem(data, setMap)
//     }
//   }
//
//   private createItem(data, setMap: boolean = false) {
//     let item = this.getItem(data);
//     this.itemEffect(item);
//     this.itemEntities[data.id] = item;
//     this.updateItem(data, setMap)
//   }
//
//   removeItem(item) {
//     item.clear();
//     let id = item.id;
//     if(this.itemEntities[id]) delete this.itemEntities[id];
//   }
//
//   clearAll() {
//     _.each(this.itemEntities, (item: HtMapItem) => {
//       item.clear()
//     })
//   }
//
// }
