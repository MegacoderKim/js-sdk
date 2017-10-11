import {Observable} from "rxjs/Observable";
import {AllowedQueryKeys, CombineQuery, DateRangeToQuery, MergeQuery} from "../base/helpers";
import {IDateRange} from "../../interfaces";
import {Partial} from "ht-models";

export const apiQueryFactory$ = (config: EntityApiQueryConfig): Observable<any[]>  => {
  let {
    active$,
    id$,
    query$,
    dateRangeQuery$,
    defaultQuery,
    allowedQueryKeys
  } = config;


  let baseQuery$ = query$
    .let(MergeQuery(defaultQuery))
    .let(AllowedQueryKeys(allowedQueryKeys))
    .let(CombineQuery(dateRangeQuery$));

  if(id$) {
    baseQuery$ = Observable.combineLatest(
      id$,
      query$
    )
  } else {
    baseQuery$ = baseQuery$.map(data => [data])
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

export interface DateRangeApiQueryConfig {
  dateRangeQuery$: Observable<object>,
}

export interface EntityItemApiQueryConfig {
  id$: Observable<string>
};

export interface EntityListApiQueryConfig {
  allowedQueryKeys: string[] | null,
  defaultQuery: object,
  active$: Observable<boolean>
}

export interface ApiQueryConfig{
  query$: Observable<object>
};

export interface EntityApiQueryConfig extends ApiQueryConfig, Partial<EntityListApiQueryConfig>, Partial<EntityItemApiQueryConfig>, Partial<DateRangeApiQueryConfig> {

}

export interface ListApiQueryConfig extends ApiQueryConfig, EntityListApiQueryConfig, DateRangeApiQueryConfig {

}

export interface ItemApiQueryConfig extends ApiQueryConfig, EntityItemApiQueryConfig, Partial<DateRangeApiQueryConfig> {

}