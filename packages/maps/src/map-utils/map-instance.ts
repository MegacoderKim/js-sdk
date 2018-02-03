import {GoogleMapUtilsClass} from "./google-map-utils";
import {filter, take} from "rxjs/operators";
import {HtBounds, HtMap, HtMapType, MapUtils} from "./interfaces";
import {LeafletMapUtilsClass} from "./leaflet-map-utils";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {LightColorMapStyle} from "../styles/light-color-map";
import {mapTypeService} from "../global/map-type";

export class MapInstance {
  // mapUtils: MapUtils = null;
  map: HtMap | null = null;
  map$: ReplaySubject<HtMap | null> = new ReplaySubject();
  clusters = [];
  poppers = [];
  itemsSet = [];
  // mapType: HtMapType;
  leafletSetBoundsOptions = {
    animate: true,
    duration: 0.3
  };
  googleSetBoundsOptions = {};
  moveEvent
  constructor() {
    this.map$.subscribe(map => {
      this.map = map;
    })
  }

  get mapUtils(): MapUtils {
    return mapTypeService.getInstance()

  }

  get mapType(): HtMapType {
    return mapTypeService.getInstance().mapType
  }
  addToItemsSet(item) {
    const i = this.itemsSet.indexOf(item);
    if (i == -1) this.itemsSet.push(item);
  }

  renderMap(elem: HTMLElement | string, options = {}) {
    let map = this.mapUtils.renderMap(elem, options);
    this.setMap(map);
    return map;
  }

  setMap(map: HtMap | null) {
    this.map$.next(map);
  }
  inValidateSize() {
    this.mapUtils.invalidateSize(this.map);
  }
  // getMap() {
  //   this.map$.take(1).subscribe(map => {
  //     return map;
  //   });
  // }
  setMapType(mapType: HtMapType) {
    mapTypeService.getInstance(mapType)
  };


  addCluster(cluster) {
    if (!this.clusters.includes(cluster)) {
      this.clusters.push(cluster);
      this.map$.pipe(
        filter(data => !!data)
      )
        .subscribe((map: HtMap) => {
          cluster.cluster = this.mapUtils.getMarkerCluster(map);
        });
    }
  }

  addPopper(popper) {
    if (!this.poppers.includes(popper)) {
      this.poppers.push(popper);
    };
    if (!this.moveEvent) {
      this.listenMove()
    }
  };

  removePopper(popper) {
    const i = this.poppers.indexOf(popper);
    if(i > -1) {
      this.poppers.splice(i, 1);
    }
  }

  listenMove() {
    this.map$.pipe(filter(data => !!data),take(1)).subscribe(map => {
      this.moveEvent = this.mapUtils.onEvent(map, 'move', (e) => {
        this.poppers.forEach(p => {
          p.scheduleUpdate()
        })
      })
    
    })
  }

  getBounds(bounds, item) {
    return item.extendBounds(bounds);
  }
  getItemsSetBounds(items: any[]) {
    let bounds = this.mapUtils.extendItemBounds();
    return items.reduce(
      (bounds, item) => {
        return this.getBounds(bounds, item);
      },
      bounds
    );
  }
  resetBounds(bounds?: HtBounds, options?, map?) {
    setTimeout(() => {
      let items = this.itemsSet;
      bounds = this.getItemsSetBounds(items);
      if (bounds && this.mapUtils.isValidBounds(bounds))
        this.setBounds(bounds, options, map);
    }, 10);
  }

  setBounds(bounds: HtBounds, options?, map?) {
    map = map || this.map;
    if (!map) return false;
    options =
      options || this.mapType == "leaflet"
        ? this.leafletSetBoundsOptions
        : this.googleSetBoundsOptions;
    this.mapUtils.setBounds(map || this.map, bounds, options);
  }
}