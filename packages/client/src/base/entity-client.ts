import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {IDateRange} from "../interfaces";
import {Page} from "ht-models";
import {combineLatest} from "rxjs/observable/combineLatest";
import {distinctUntilChanged, map} from "rxjs/operators";

export abstract class EntityClient {
  /**
   * API class which handles requests for the entity
   */
  api;

  /**
   * Appended at start of date range params. Example if start date of date range is x the params in query will be
   * min_<dateRangeParam> like min_created_at
   * @type {string}
   */
  dateRangeParam = 'recorded_at';

  /**
   * Returns entity array or if selected just the selected entity id as array of length 1
   * @param id$
   * @param dataArray$
   * @param selected$
   * @returns {any}
   */
  dataArrayWithSelected$(id$, dataArray$, selected$) {
    const userId$ = id$;
    const placelinePage$ = selected$.pipe(
      distinctUntilChanged(),
      map((data) => {
        return data ? [data] : null;
      })
    ); //todo take query from placeline

    const array$ = combineLatest(
      placelinePage$,
      userId$,
      dataArray$,
      (placelinePage, userId, dataArray) => {
        const filteredData = _.filter(dataArray, (user) => {
          return userId ? user.id == userId : true;
        });
        return placelinePage && userId ? placelinePage : filteredData
      }
    );


    return array$
  }

  pageDataWithSelected$(id$, pageData$, selected$) {
    const userId$ = id$;
    const placelinePage$ = selected$.pipe(
      distinctUntilChanged(),
      map((data) => {
        return data ? [data] : null;
      }) //todo take query from placeline
    )


    const newPageData$ = combineLatest(
      placelinePage$,
      userId$,
      pageData$,
      (placelineResults, userId, pageData: Page<any>) => {
        if (!pageData) return pageData;
        const filteredData = _.filter(pageData.results, (user) => {
          return userId ? user.id == userId : true;
        });
        let results = placelineResults && userId ? placelineResults : filteredData;
        let count = userId ? 0 : pageData.count;
        return {...pageData, results, count}
      }
    );


    return newPageData$
  }

  clearData() {

  }

  /**
   * Converts date range to query params object
   * @param {IDateRange} range
   * @returns {Object}
   */
  getQueryFromDateRange(range: IDateRange): object {
    if (!range) return {};
    let start =  range['start'];
    let end = range['end'];
    let param = this.dateRangeParam;
    return {[`min_${param}`]: start, [`max_${param}`]: end, start: null, end: null}
  }

  getPageFromEntity(item$) {
    return item$
  }

}