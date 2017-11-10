import {HtBounds, HtMap, HtMapType} from "./interfaces";
import {HtSegmentsTrace} from "./segments-trace";
import {IUserData} from "ht-models";
import {usersClustersFactory} from "./entities/users-cluster";
import {LightColorMapStyle} from "./styles/light-color-map";
import {HtMapItem} from "./map-item";
import * as _ from "underscore";
import {MapService} from "./map-service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {currentId} from "async_hooks";

export class HtMapClass {
  // map: HtMap;
  // mapUtils: MapUtils;
  // userData$: Observable<IUserData | null>;
  userDataSub: Subscription;
  segmentTrace: HtSegmentsTrace;
  usersCluster;
  leafletSetBoundsOptions: L.PanOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {

  };
  googleMapOptions = {
    center: {lat: 0, lng: 0}, zoom: 2,
    fullscreenControl: false,
    streetViewControl: false,
    styles: LightColorMapStyle
  };
  leafletMapOptions = {center: [3.505, 0], zoom: 2};
  mapItemsSet = [];
  // clusters = [];
  // map$ = new ReplaySubject();

  constructor(public mapType: HtMapType = 'leaflet', options: HtMapClassOptions = {}) {
    MapService.setMapType(mapType);
    this.usersCluster = usersClustersFactory();
    this.segmentTrace = new HtSegmentsTrace();
    this.mapItemsSet.push(this.segmentTrace, this.usersCluster);
  }

  get map$(): ReplaySubject<HtMap> {
    return MapService.map$ as ReplaySubject<HtMap>
  }

  get map() {
    return MapService.map
  }

  initMap(elem: Element, options = {}): HtMap {
    let mapOptions = this.mapType == 'leaflet' ? this.leafletMapOptions : this.googleMapOptions;
    let map = MapService.mapUtils.renderMap(elem, {...mapOptions, ...options});
    MapService.setMap(map);
    return map
  }

  setPlacelineData$(data$: Observable<IUserData | null>) {
    if (this.userDataSub) {
      this.userDataSub.unsubscribe();
    }
    this.initUserDataObserver(data$)
  }

  private initUserDataObserver(data$: Observable<IUserData | null>) {
    let userData$ = data$.scan((acc, data) => {
      const oldId = acc.user ? acc.user.id : null;
      const currentId = data ? data.id : null;
      const isNew = currentId && oldId ? currentId !== oldId : true;
      return {user: data, isNew, oldId }
    }, {user: null, oldId: null, isNew: true});

    let sub = userData$.subscribe((acc) => {
      const userData = acc.user;
      const isNew = acc.isNew;
      this.tracePlaceline(userData);
      if(isNew) this.resetBounds()
    });
    this.userDataSub = sub;
  }

  tracePlaceline(user: IUserData) {
    this.segmentTrace.trace(user)
  }

  resetBounds(bounds?: HtBounds, options?) {
    setTimeout(() => {
      let items = this.mapItemsSet;
      bounds = this.getBoundsItem(items);
      if(bounds && MapService.mapUtils.isValidBounds(bounds)) this.setBounds(bounds, options)
    }, 10)

  };

  getBoundsItem(items) {
    let bounds = MapService.mapUtils.extendBounds();
    return _.reduce(items, (bounds, item: HtMapItem<any>) => {
      return this.getBounds(bounds, item)
    }, bounds)
  }

  getBounds(bounds, item) {
    return item.extendBounds(bounds)
  }

  setBounds(bounds: HtBounds, options?) {
    options = options || this.mapType == 'leaflet' ? this.leafletSetBoundsOptions : this.googleSetBoundsOptions;
    MapService.mapUtils.setBounds(this.map, bounds, options)
  }

  inValidateSize() {
    MapService.mapUtils.invalidateSize(this.map)
  }
}

export interface HtMapClassOptions {

}