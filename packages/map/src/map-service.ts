import {ReplaySubject} from "rxjs/ReplaySubject";

export const MapService = {
  map: null,
  map$: new ReplaySubject(),
  setMap(map) {
    this.map$.next(map)
  },
  getMap() {
    this.map$.take(1).subscribe(map => {
      return map
    })
  }
};

MapService.map$.subscribe(map => {
  MapService.map = map
});