import {debounceTime, filter, map, take, throttleTime} from "rxjs/operators";
import {HtBounds, HtMap, HtMapType, MapUtils} from "ht-map-wrapper";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {mapTypeService} from "../global/map-type";
import {fromEventPattern} from "rxjs/observable/fromEventPattern";
import {Observable} from "rxjs/Observable";
import {merge} from "rxjs/observable/merge";

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
  setBoundsOptions;
  moveEvent;
  resetBoundsTimeout;
  loading$: Observable<boolean>;
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
    setTimeout(() => {
      this.mapUtils.invalidateSize(this.map);
    }, 100)
  };

  getInteraction$(): Observable<boolean> {
    // todo move this to mapUtils for each mapType
    const mapUtils = this.mapUtils;
    const thismap = this.map;
    const mapmoveEnd$ = mapUtils.onEvent$(thismap, 'moveend');
    const mapmoveStart$ = mapUtils.onEvent$(thismap, 'movestart');
    const moveEnd$ = mapUtils.onEvent$(thismap, 'mouseup mouseout dragend');
    const move$ = mapUtils.onEvent$(thismap, 'move zoomlevelschange');
    const moveStart$ = mapUtils.onEvent$(thismap, 'click tap mousedown dragstart');
    const load$ = mapUtils.onEvent$(thismap, 'load');
    return merge(
      moveStart$.pipe(
        throttleTime(15),
        map(() => true)
      ),
      moveEnd$.pipe(
        debounceTime(15),
        map(() => false)
      ),
      load$.pipe(
        // debounceTime(15),
        map(() => false)
      )
    )
  }
  // getMap() {
  //   this.map$.take(1).subscribe(map => {
  //     return map;
  //   });
  // }
  setMapType(mapType: HtMapType, key?: string) {
    mapTypeService.getInstance(mapType);
    if (key) this.mapUtils.setKey(key)
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
    return item.extendBounds ? item.extendBounds(bounds) : null;
  }
  getItemsSetBounds(items: any[]) {
    let bounds = this.mapUtils.extendItemBounds();
    return items.reduce(
      (bounds, item) => {
        return this.getBounds(bounds, item) || bounds;
      },
      bounds
    );
  }
  resetBounds(options?) {
    if(this.resetBoundsTimeout) clearTimeout(this.resetBoundsTimeout)
    this.resetBoundsTimeout = setTimeout(() => {
      let items = this.itemsSet;
      let bounds = this.getItemsSetBounds(items);
      if (bounds && this.mapUtils.isValidBounds(bounds))
        this.setBounds(bounds, options);
    }, 40);
  }

  setBounds(bounds: HtBounds, options?) {
    let map = this.map;
    if (!map) return false;
    let mapOptions = (this.mapType == "leaflet"
      ? this.leafletSetBoundsOptions
      : this.googleSetBoundsOptions)
    options =
      options || this.setBoundsOptions || mapOptions;
    this.mapUtils.setBounds(map || this.map, bounds, {...mapOptions, ...options});
  }


  onEvent$(type: string): Observable<any> {
    return this.mapUtils.onEvent$(this.map, type)
  }

  private mapEventHandler(type) {
    return (handler) => this.mapUtils.onEvent(this.map, type, handler)
  }

  private removeHandler(type) {
    return (handler) => this.mapUtils.removeEvent(this.map, type, handler)
  }
}