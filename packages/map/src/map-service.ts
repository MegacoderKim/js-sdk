import {ReplaySubject} from "rxjs/ReplaySubject";
import {HtMapType} from "./map-utils";
import {LeafletUtils} from "./leaflet-map-utils";
import {GoogleMapUtils} from "./google-map-utils";

export const MapService = {
  mapUtils: null,
  map: null,
  map$: new ReplaySubject(),
  setMap(map) {
    this.map$.next(map)
  },
  getMap() {
    this.map$.take(1).subscribe(map => {
      return map
    })
  },
  setMapType(mapType: HtMapType) {
    this.mapUtils = mapType == 'leaflet' ? LeafletUtils : GoogleMapUtils;
  }
};

MapService.map$.subscribe(map => {
  MapService.map = map
});