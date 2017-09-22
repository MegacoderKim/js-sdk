import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {IDateRange} from "../interfaces";

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
    const placelinePage$ = selected$.distinctUntilChanged()
      .map((data) => {
        return data ? [data] : null;
      }); //todo take query from placeline

    const array$ = Observable.combineLatest(
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
    return item$.map()
  }

}