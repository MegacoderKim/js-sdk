import {Observable} from "rxjs/Observable";
import {AllowedQueryKeys, CombineQuery, MergeQuery} from "../helpers/operators";
import {map, mergeMap} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {empty} from "rxjs/observable/empty";

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
