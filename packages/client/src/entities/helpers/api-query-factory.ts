import {Observable} from "rxjs/Observable";
import {AllowedQueryKeys, CombineQuery, MergeQuery} from "../base/helpers";

export const apiQueryF = (e, type: 'list' | 'item') => {

  let apiQueryF = (entity, type: 'list' | 'item') => {
    let {
      active$,
      id$,
      query$,
      dateRangeQuery$,
      defaultQuery,
      allowedQueryKeys
    } = entity;

    let baseQuery$ = query$
      // .do(data => {
      //   console.log("vase", data);
      // })
      .let(MergeQuery(defaultQuery))
      // .do(data => {
      //   console.log("quer", data);
      // })
      .let(AllowedQueryKeys(allowedQueryKeys))
      // .do(data => {
      //   console.log("allowed", data, e.name, allowedQueryKeys);
      // })
      .let(CombineQuery(dateRangeQuery$))
      // .do(data => {
      //   console.log("data", data);
      // });

    if(type === 'item') {
      baseQuery$ = Observable.combineLatest(
        id$,
        query$
      )
    } else {
      baseQuery$ = baseQuery$.map(data => {
        return [data]
      })
    }
    let apiQuery$;
    if(active$) {
      apiQuery$ = active$ ? active$.mergeMap((isActive: boolean) => {
        return isActive ? baseQuery$ : Observable.of(null)
      }) : baseQuery$;
    } else {
      apiQuery$ = baseQuery$
    }
    return apiQuery$



  };

  return {
    ...e,
    apiQuery$() {
      return apiQueryF(this, type)
    },
    getApiQuery$() {
      return this.apiQuery$().map(data => {
        let queryIndex = type === 'list' ? 0 : 1;
        return data ? data[queryIndex] : data;
      })
    }
  }
};