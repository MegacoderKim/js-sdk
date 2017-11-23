import {combineLatest} from "rxjs/observable/combineLatest";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";

export const dataWithSelectedId$ = (data$, id$, keys: string[]): Observable<any> => {
  return combineLatest(
    data$,
    id$,
    (data, id) => {
      if(!data && keys.length) return data;
      return id ?
        _.reduce(keys, (acc, key) => {
          return acc[key] ? {...acc, [key]: acc[key].filter(item => {
            return item.id === id;
          })} : acc;
        }, data) : data;
    }
  )
};