import {Observable} from "rxjs/Observable";
import {AllowedQueryKeys, CombineQuery, MergeQuery} from "../base/helpers";
import {map, mergeMap} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {empty} from "rxjs/observable/empty";
import {of} from "rxjs/observable/of";

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
      .let(CombineQuery(dateRangeQuery$));
      // .do(data => {
      //   console.log("data", data);
      // });

    if(type === 'item') {
      baseQuery$ = combineLatest(
        id$,
        query$
      )
    } else {
      baseQuery$ = baseQuery$.pipe(
        map(data => {
          return [data]
        })
      )
    }
    let apiQuery$;
    if(active$) {
      apiQuery$ = active$ ? active$.pipe(
        mergeMap((isActive: boolean) => {
          return isActive ? baseQuery$ : of(null)
        })
      ) : baseQuery$;
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
      return this.apiQuery$().pipe(
        map(data => {
          let queryIndex = type === 'list' ? 0 : 1;
          return data ? data[queryIndex] : data;
        })
      )
    }
  }
};

export class ListQuery {
  query$: Observable<null | object>;
  getDefaultQuery: () => object;
  allowedQueryKeys;
  dateRangeQuery$;
  active$;
  name
  getApiQuery$() {
    return this.getApiParams$().pipe(
      map(data => {
        return data[0];
      })
    )
  }

  getApiParams$() {
    // console.log(this.getDefaultQuery(), this.name);
    let baseQuery$ = this.query$
      .let(AllowedQueryKeys(this.allowedQueryKeys))// .do(data => {
      .let(MergeQuery(this.getDefaultQuery()))
      .let(CombineQuery(this.dateRangeQuery$));

    baseQuery$ = baseQuery$.pipe(
      map(data => {
        return [data]
      })
    );
    // console.log(this.active$, "$aa");
    return this.active$ ? this.active$.let(mergeMap((isActive: boolean) => {
      // console.log(isActive, "acrr");
      return isActive ? baseQuery$ : empty()
    })) : empty();
  }

}

export class ItemQuery {
  id$;
  query$;
  getDefaultQuery: () => object;

  getApiQuery$() {
    return this.getApiParams$().pipe(
      map(data => {
        return data[1];
      })
    )
  }

  getApiParams$() {
    return combineLatest(
      this.id$,
      this.query$.let(MergeQuery(this.getDefaultQuery()))
    )
  }
}

// export class ApiQuery {
//   type: string;
//
//   getApiQuery$() {
//     return this.apiQueryF(this, this.type)
//   }
//
//   get apiQuery$() {
//     return this.getApiQuery$().map(data => {
//       let queryIndex = this.type === 'list' ? 0 : 1;
//       return data ? data[queryIndex] : data;
//     })
//   }
//
//   private apiQueryF(entity, type) {
//     let {
//       active$,
//       id$,
//       query$,
//       dateRangeQuery$,
//       defaultQuery,
//       allowedQueryKeys
//     } = entity;
//
//     let baseQuery$ = query$
//     // .do(data => {
//     //   console.log("vase", data);
//     // })
//       .let(MergeQuery(defaultQuery))
//       // .do(data => {
//       //   console.log("quer", data);
//       // })
//       .let(AllowedQueryKeys(allowedQueryKeys))
//       // .do(data => {
//       //   console.log("allowed", data, e.name, allowedQueryKeys);
//       // })
//       .let(CombineQuery(dateRangeQuery$));
//     // .do(data => {
//     //   console.log("data", data);
//     // });
//
//     if(type === 'item') {
//       baseQuery$ = Observable.combineLatest(
//         id$,
//         query$
//       )
//     } else {
//       baseQuery$ = baseQuery$.map(data => {
//         return [data]
//       })
//     }
//     let apiQuery$;
//     if(active$) {
//       apiQuery$ = active$ ? active$.mergeMap((isActive: boolean) => {
//         return isActive ? baseQuery$ : Observable.of(null)
//       }) : baseQuery$;
//     } else {
//       apiQuery$ = baseQuery$
//     }
//     return apiQuery$
//   }
// }