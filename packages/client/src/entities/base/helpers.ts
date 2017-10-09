

import {Observable} from "rxjs/Observable";
import {Page} from "ht-models";

export const MergeQuery = (defaultQuery) => {
  return (query$) => {
    return query$.map((query) => {
      return query ? {...defaultQuery, ...query} : query;
    })
  }
};

export const CombineQuery = (addQuery$) => {
  return (query$) => {
    return Observable.combineLatest(
      addQuery$,
      query$,
      (addQuery, query) => {
        return query ? {...addQuery, ...query} : query;
      }
    )
  }
};

export const PageResults = (pageData$: Observable<Page<any> | null>): Observable<any[] | any> => {
  return pageData$.map((pageDate: Page<any> | null) => {
    return pageDate ? pageDate.results : pageDate;
  })
}