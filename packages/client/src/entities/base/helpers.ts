

import {Observable} from "rxjs/Observable";
import {Page} from "ht-models";
import {IDateRange} from "../../interfaces";

export const MergeQuery = (defaultQuery) => {
  return (query$) => {
    return query$.map((query) => {
      return query ? {...defaultQuery, ...query} : query;
    })
  }
};

export const CombineQuery = (addQuery$) => {
  return (query$) => {
    if(addQuery$) {
      return Observable.combineLatest(
        addQuery$,
        query$,
        (addQuery, query) => {
          return query ? {...addQuery, ...query} : query;
        }
      )
    } else {
      return query$
    }

  }
};

export const PageResults = (pageData$: Observable<Page<any> | null>): Observable<any[] | any> => {
  return pageData$.map((pageDate: Page<any> | null) => {
    return pageDate ? pageDate.results : pageDate;
  })
};

export const DateRangeToQuery = (dateRangeParam: string): (param: Observable<IDateRange>) => Observable<object> => {
  return (dateRangeQuery$: Observable<IDateRange>) => {
    return dateRangeQuery$.map((dateRange) => {
      if (!dateRange) return {};
      let start =  dateRangeParam['start'];
      let end = dateRange['end'];
      let param = dateRangeParam;
      return {[`min_${param}`]: start, [`max_${param}`]: end}
    })
  }
}