import {Observable} from "rxjs/Observable";
// import {MergeQuery} from "ht-data";
import { CombineQueries, AllowedQueryKeys$} from "ht-data";
import {map, mergeMap} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {empty} from "rxjs/observable/empty";
import {MergeQuery, AllowedQueryKeys} from "../helpers/operators";
import {Constructor} from "ht-models";
import {of} from "rxjs/observable/of";

export class ListQuery {
  query$: Observable<null | object>;
  getDefaultQuery: () => object;
  allowedQueryKeys;
  dateRangeQuery$;
  active$;
  name;
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
      .let(CombineQueries([this.dateRangeQuery$]));

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

export interface IListQueryBase {
  query$: Observable<null | object>,
  allowedQueryKeys?: string[],
  getDefaultQuery(): object,
  dateRangeQuery$?: Observable<object>,
  active$?: Observable<boolean>
}

export function listQueryMixin  <TBase extends Constructor<IListQueryBase>>(Base: TBase) {
  return class extends Base {
    getApiQuery$(): Observable<any> {
      return this.getApiParams$().pipe(
        map((data: any[]) => {
          return data[0];
        })
      )
    }

    getApiParams$() {
      // console.log(this.getDefaultQuery(), this.name);
      let baseQuery$ = this.query$
        .let(AllowedQueryKeys(this.allowedQueryKeys))// .do(data => {
        .let(MergeQuery(this.getDefaultQuery()))
        .let(CombineQueries([this.dateRangeQuery$ || of({})]));

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

export interface IItemQueryBase {
  query$: Observable<null | object>,
  // allowedQueryKeys?: string[],
  getDefaultQuery(): object,
  // dateRangeQuery$?: Observable<object>,
  // active$?: Observable<boolean>,
  id$: Observable<string| null>
}

export function itemQueryMixin  <TBase extends Constructor<IItemQueryBase>>(Base: TBase) {
  return class extends Base {
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
}

