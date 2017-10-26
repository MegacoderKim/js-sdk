import {HtMapItems} from "../map-items";
import * as _ from 'underscore';
import {HtUserMarker} from "./user-marker";
import {SetFocusConfig} from "../interfaces";
import {htUser} from "ht-js-data";
import {IUser, IUserAnalytics} from "ht-models";
import {ClusterEntities, clustersFactory} from "../base/clusters-factory";
import {dataFactory} from "../helpers/data-factory";
import {mapItemsFactory} from "../base/map-items-factory";
import {MapEntities} from "./interfaces";
import {StyleObj} from "../helpers/styles-factory";
import {userDivFactory} from "../helpers/user-div-factory";
declare const RichMarkerPosition: any;

export class UsersCluster extends HtMapItems<IUser | IUserAnalytics> {
  itemEntities: {[id: string]: HtUserMarker} = {};
  markerCluster;
  popup;
  onClick: (data, marker) => void;
  setFocusConfig: SetFocusConfig = {
    zoom: 17,
    force: true,
    center: true
  };
  onReady() {
    this.popup = this.mapUtils.getPopup({
      disableAutoPan: true,
      pixelOffset: new google.maps.Size(0, -37)
    })
  }

  extendBounds(bounds) {
    bounds = bounds || this.mapUtils.extendBounds();
    let newBounds = _.reduce(this.itemEntities, (bounds, item) => {
      return item.extendBounds(bounds)
    }, bounds);
    return newBounds

  }

  filteredItem(items: any[]) {
    return _.filter(items, (item) => htUser(item).isValidMarker());
  }

  getItem(item) {
    let marker = new HtUserMarker(this.mapType);
    //todo make this configurable
    this.mapUtils.onEvent(marker.item, 'click', () => {
      if(this.onClick) {
        this.onClick(marker.data, marker.item)
      } else {
        // this.openPopup()
        this.highlight(marker.data, this.setFocusConfig);
        // let position = marker.dataClass.getPosition();
        // this.mapUtils.openPopupPosition(position, this.map, this.getInfoContent(marker.data), this.popup)
      }

    });
    this.mapUtils.onEvent(marker.item, 'mouseover', () => {
      this.openPopup(marker);
    });

    this.mapUtils.onEvent(marker.item, 'mouseout', () => {
      this.closePopup();
    });
    return marker
  }

  openPopup(marker) {
    let position = marker.dataClass.getPosition();
    this.mapUtils.openPopupPosition(position, this.map, this.getInfoContent(marker.data), this.popup)
  }

  closePopup() {
    this.mapUtils.setMap(this.popup, null)
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
    let userMarkerArray = _.values(itemEntity)
      .filter((usermarker) => {
        let isValid = htUser(usermarker.data).isValidMarker();
        return isValid;
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
    super.highlightItem(item, data, this.setFocusConfig);
    this.mapUtils.openPopupPosition(item.dataClass.getPosition(), this.map, this.getInfoContent(data), this.popup)
  }
};

export const usersClustersFactory = (): ClusterEntities<any> => {
  let config = {
    getPosition(data) {
      return htUser(data).getPosition()
    },
    getDivContent(data) {
      return userDivFactory(data)
    }
  };
  let stylesObj: StyleObj = {
    google: {
      default: {
        flat: true,
        anchor: RichMarkerPosition.BOTTOM_CENTER,
        zIndex: 1
      }
    },
    leaflet: {
      default: {

      }
    }
  };
  let data = dataFactory(config);
  return clustersFactory({data, name: 'user cluster', isDiv: true, stylesObj})
};

