import {HtMapItems} from "../map-items";
import * as _ from 'underscore';
import {HtUserMarker} from "./user-marker";
import {HtMap, HtMapType} from "../interfaces";
import {htUser} from "ht-js-data";


export class UsersCluster extends HtMapItems{
  itemEntities: {[id: string]: HtUserMarker} = {};
  markerCluster;

  // extendBounds(bounds) {
  //   bounds = bounds || this.mapUtils.extendBounds();
  //   if(this.mapType == 'google') {
  //     let newBounds = _.reduce(this.itemEntities, (bounds, item) => {
  //       return item.extendBounds(bounds)
  //     }, bounds);
  //     return newBounds
  //     // console.log(this.itemEntities, Object.keys(this.itemEntities).length);
  //     // let newBounds = Object.keys(this.itemEntities).length ? this.markerCluster.getExtendedBounds(bounds) : bounds
  //     // return newBounds
  //   } else {
  //     let newBounds = _.reduce(this.itemEntities, (bounds, item) => {
  //       return item.extendBounds(bounds)
  //     }, bounds);
  //     return newBounds
  //   }
  //
  // }

  filteredItem(items: any[]) {
    return _.filter(items, (item) => htUser(item).isValidMarker());
  }

  getItem(item) {
    return new HtUserMarker(this.mapType)
  }

  removeItem(mapItem: HtUserMarker) {
    this.mapUtils.removeClusterMarker(this.markerCluster, mapItem.item);
    // this.markerCluster.removeLayer(mapItem.item);
    // super.removeItem(mapItem)
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
}