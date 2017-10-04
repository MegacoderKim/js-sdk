import {HtMapItems} from "../map-items";
import * as _ from 'underscore';
import {HtUserMarker} from "./user-marker";
import {HtMap, HtMapType} from "../interfaces";
import {htUser} from "ht-js-data";


export class UsersCluster extends HtMapItems {
  itemEntities: {[id: string]: HtUserMarker} = {};
  markerCluster;
  popup;

  onReady() {
    this.popup = this.mapUtils.getPopup({
      disableAutoPan: true,
      pixelOffset: new google.maps.Size(0, -37)
    })
  }

  extendBounds(bounds) {
    bounds = bounds || this.mapUtils.extendBounds();
    if(this.mapType == 'google') {
      let newBounds = _.reduce(this.itemEntities, (bounds, item) => {
        return item.extendBounds(bounds)
      }, bounds);
      return newBounds
      // console.log(this.itemEntities, Object.keys(this.itemEntities).length);
      // let newBounds = Object.keys(this.itemEntities).length ? this.markerCluster.getExtendedBounds(bounds) : bounds
      // return newBounds
    } else {
      let newBounds = _.reduce(this.itemEntities, (bounds, item) => {
        return item.extendBounds(bounds)
      }, bounds);
      return newBounds
    }

  }

  filteredItem(items: any[]) {
    return _.filter(items, (item) => htUser(item).isValidMarker());
  }

  getItem(item) {
    let marker = new HtUserMarker(this.mapType);
    //todo make this configurable
    this.mapUtils.onEvent(marker.item, 'click', () => {
      let position = marker.dataClass.getPosition();
      this.mapUtils.openPopupPosition(position, this.map, this.getInfoContent(marker.data), this.popup)
    });
    return marker
  }

  getInfoContent(data) {
    // let data = this.data;
    if(this.options.getInfoContent) return this.options.getInfoContent(data);
    let string = `<div>
<strong>${data.name}</strong>
<div>${data.display.status_text}</div>
<div>${data.display.sub_status_text}</div>
</div>`;
    return string
  }

  removeItem(mapItem: HtUserMarker) {
    this.mapUtils.removeClusterMarker(this.markerCluster, mapItem.item);
    super.removeItem(mapItem)
// this.markerCluster.removeLayer(mapItem.item);
    // super.removeItem(mapItem)
  }

  removeItems() {
    this.mapUtils.removeClusterMarkers(this.markerCluster);
  }

  traceItemEffect(itemEntity: {[id: string]: HtUserMarker}) {
    // this.mapUtils.removeClusterMarkers(this.markerCluster);
    let userMarkerArray = _.values(itemEntity)
      .filter((usermarker) => {
        // console.log(usermarker.data);
        let isValid = htUser(usermarker.data).isValidMarker();
        return isValid;
        // console.log(isValid, "isValid");
      })
      .map(userMarker => {
        // userMarker = _.filter(userMarker, (userMak))
        return userMarker.item
      });
    this.mapUtils.addMarkersToCluster(this.markerCluster, userMarkerArray, this.map);
    // this.markerCluster.addLayers(userMarkerArray);
    // this.markerCluster.refreshClusters(userMarkerArray);
  }

  highlightItem(item, data) {
    // this.mapUtils.setMap(this.popup, null);
    super.highlightItem(item, data);
    this.mapUtils.openPopupPosition(item.dataClass.getPosition(), this.map, this.getInfoContent(data), this.popup)
  }
}