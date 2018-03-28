// import {Color} from "../../utils/color";
// import {ExtendBoundsWithPolyline, SetEncodedPath} from "../../utils/map-utls";
// import {IPathSegment, IPlaceline} from "ht-models";
// import {AntPath} from "leaflet-ant-path";
// import {HMString} from "../../utils/hm-string";
// import {TimeString} from "../../utils/time-string";
// import {DateString} from "../../utils/date-string";
// import * as _ from "underscore";
// import {DistanceLocale} from "ht-utility";
// import {HtMapItem} from "./ht-js-map/map-item";
// import {TimeAwareEncoder} from "time-aware-polyline";
// import {latLngBounds, polyline} from "leaflet";
//
// export class HtPolyline extends HtMapItem {
//     // item: L.Polyline = L.polyline([]);
//     // item: L.Polyline;
//     fadePolyline: L.Polyline = polyline([],
//       {
//         color: Color.grey2,
//         weight: 3,
//         opacity: 0.9
//       });
//     item: L.Polyline = new AntPath([], {
//         dashArray: '5, 7',
//         color: Color.blueLight,
//         opacity: 1,
//         weight: 8,
//         delay: 2000,
//         pulseColor: Color.blue
//     });
//     items: L.Polyline[] = [];
//     timeAwarePolyline = new TimeAwareEncoder();
//     // defaultStyle = {
//     //     dashArray: '5, 7',
//     //     color: Color.mapBg,
//     //     opacity: 1,
//     //     weight: 3,
//     //     delay: 1200,
//     //     pulseColor: Color.blue
//     // };
//     highlighedPolyline = polyline([],
//       {
//         color: '#2b60a9',
//         weight: 11,
//         opacity: 1
//       });
//     fadeStyle = {
//         dashArray: '1, 7',
//         color: Color.blueLight,
//         opacity: 1,
//         weight: 3,
//         delay: 1200,
//         pulseColor: Color.blue
//     };
//
//
//     update(data: IPlaceline, map: L.Map) {
//         // this.item.addTo(map);
//         //todo multiple tooltip start end
//         // HtUpdateTooltip(this.item, this.getInfoContent(item), {
//         //     sticky: true,
//         //     opacity: 1
//         // });
//         if(!this.isFaded) {
//           let items = this.renderSegments(data, map);
//           // let lastItem = _.last(this.items);
//
//           this.clearItems();
//           this.items = items;
//           this.highlighedPolyline.bindTooltip(this.getInfoContent(this.data));
//         }
//         // SetEncodedPath(this.item, item.route);
//         SetEncodedPath(this.fadePolyline, data.route);
//         SetEncodedPath(this.highlighedPolyline, data.route);
//         this.updateItem(data)
//     }
//
//     highlight(map) {
//       // console.log("highlight", this.item);
//       this.highlighedPolyline.addTo(map);
//       this.highlighedPolyline.bringToBack();
//       // this.highlighedPolyline.openTooltip()
//       // console.log(this.lastItem());
//       // this.lastItem().openTooltip();
//       // this.setFocus(map);
//       this.bringToFront();
//     }
//
//     unHighlight(map) {
//       _.each(this.items, (item) => {
//         item.bringToBack()
//       })
//       // this.fadePolyline.addTo(map);
//       // this.fadePolyline.bringToBack();
//       // this.removeSegments()
//     }
//
//     resetHighlight(map) {
//       this.isFaded = false;
//       // this.renderSegmentsFromData(map);
//       // this.fadePolyline.remove();
//       this.highlighedPolyline.remove();
//     }
//
//     renderSegmentsFromData(map) {
//       this.renderSegments(this.data, map)
//     }
//
//     removeSegments() {
//       _.each(this.items, (item) => {
//         item.remove();
//       })
//     }
//
//     renderSegments(data: IPlaceline, map: L.Map) {
//         let timeAwareArray = this.timeAwarePolyline.decodeTimeAwarePolyline(data.location_time_series);
//         let segs = this.timeAwarePolyline.getPolylineSegmentsForLocationsElapsed(timeAwareArray, new Date().toISOString());
//         // console.log(segs, "segms");
//         let items = _.map(segs, (segment: IPathSegment) => {
//             return this.renderSegment(segment, map)
//         });
//         // _.each(this.items, item => {
//         //     item.remove()
//         // });
//         return items
//         // this.items = items;
//     }
//
//     private lastItem() {
//       return _.last(this.items)
//     }
//
//     private renderSegment(segment: IPathSegment, map: L.Map): L.Polyline {
//         let item = this.getItemPolyline(segment.style);
//         item.addTo(map);
//         item.setLatLngs(segment.path);
//         return item;
//     }
//
//     private getItemPolyline(style: string) {
//         if(style == 'solid') {
//             return new AntPath([], {
//                 dashArray: '3, 7',
//                 color: Color.blueLight,
//                 opacity: 1,
//                 weight: 5,
//                 delay: 2000,
//                 pulseColor: Color.blue
//             });
//         } else {
//             return new AntPath([], {
//                 dashArray: '3, 9',
//                 color: '#fff',
//                 opacity: 1,
//                 weight: 5,
//                 delay: 2000,
//                 pulseColor: Color.blueLight
//             });
//         }
//     }
//
//     setFocus(map: L.Map) {
//       if(this.items.length) {
//         let bounds = this.getBounds();
//         if(bounds.isValid()) map.flyToBounds(bounds, {animate: true, padding: [50, 50], duration: 1, easeLinearity: 0.58})
//       }
//     }
//
//     getBounds(bounds: L.LatLngBounds = latLngBounds([])) {
//         return _.reduce(this.items, (bounds: L.LatLngBounds, item: L.Polyline) => {
//             return ExtendBoundsWithPolyline(item, bounds)
//         }, bounds);
//         // return ExtendBoundsWithPolyline(this.item, bounds)
//     }
//
//     extendBounds(bounds: L.LatLngBounds = latLngBounds([])) {
//         return _.reduce(this.items, (bounds: L.LatLngBounds, item: L.Polyline) => {
//             return ExtendBoundsWithPolyline(item, bounds)
//         }, bounds);
//         // return ExtendBoundsWithPolyline(this.item, bounds)
//     }
//
//     clear() {
//         this.fadePolyline.remove();
//        this.clearItems()
//     }
//
//     private clearItems() {
//       _.each(this.items, item => {
//         item.remove()
//       });
//     }
//
//     private getPolylineInfo(item: IPlaceline) {
//         // console.log(item, "data");
//         return "polyline"
//     }
//     getInfoContent(data: IPlaceline): string {
//         let durationString = null;
//         let distanceString = null;
//         if(data.started_at && data.ended_at) {
//             let durationMin = (new Date(new Date(data.ended_at).getTime() - new Date(data.started_at).getTime()).getTime()) / (1000 * 60);
//             durationString = HMString(durationMin);
//           distanceString = DistanceLocale(data.distance)
//         }
//
//         let start = TimeString(data.started_at);
//         let end = TimeString(data.ended_at);
//         let startDate = DateString(data.started_at);
//         let endDate = DateString(data.ended_at);
//         let sameDate = startDate == endDate;
//       return `<div class="flex-column">
// <strong class="text-muted text-center" style="padding-bottom: 0; color: ${Color.blue}">${data.type || 'TRIP'}</strong>
// <div style="display: ${start ? 'display' : 'none'}" class="flex-row text-1 space-between">
//     <div>${start || '--:--'}</div><div>&nbsp; to &nbsp;</div><div class="text-right">${end || '--:--'}</div>
// </div>
// <div style="${this.htShow(startDate || endDate)}" class="${sameDate || !endDate ? 'space-around' : 'space-between'} text-2 text-muted flex-row">
//     <div>${startDate}</div><div style="display: ${sameDate || !endDate ? 'none' : 'block'}">${endDate}</div>
// </div>
// <div style="display: ${durationString ? 'block' : 'none'}" class="text-3 text-center">${durationString} &bull; ${distanceString}</div>
// </div>`
//     }
//
//     private htShow(item) {
//         return `display: ${item ? 'flex' : 'none'}`
//     }
// }
