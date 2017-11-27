import {distinctUntilChanged, map} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {of} from "rxjs/observable/of";

export const AllowedQueryKeys$ = (allowedQueryKeys?: string[] | null) => {
  return (queryStore$) => {
    if(allowedQueryKeys && allowedQueryKeys.length) {
      let keys$ = allowedQueryKeys.map( (key: string) => {
        return queryStore$
          .pipe(
            map(store => store ? store[key] : null),
            distinctUntilChanged(),
            map(value => {
              return value ? {[key]: value} : null
            })
          )
      });
      return combineLatest(...keys$).pipe(
        map(obsArray => {
          console.log(obsArray, "arr");
          return obsArray.reduce((acc, query) => {
            return query ? {...acc, ...query} : acc
          }, {});
        })
      )
    } else if(allowedQueryKeys) {
      return of({})
    } else {
      return queryStore$
    }
  }
};