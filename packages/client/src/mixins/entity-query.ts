import {Observable} from "rxjs/Observable";
// import {MergeQuery} from "ht-data";
import { CombineQueries, AllowedQueryKeys$} from "ht-data";
import {map, mergeMap} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {empty} from "rxjs/observable/empty";
import {MergeQuery, AllowedQueryKeys} from "../helpers/operators";

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
