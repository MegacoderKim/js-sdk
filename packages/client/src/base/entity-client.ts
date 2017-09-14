import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {IDateRange} from "../entities/users/users-client";

export abstract class EntityClient {
  dateRangeParam = 'created_at';

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
        return placelinePage && userId ? placelinePage : _.filter(dataArray, (user) => {
          return userId ? user.id == userId : true;
        })
      }
    );


    return array$
  }

  clearData() {

  }


  getQueryFromDateRange(range: IDateRange): object {
    if (!range) return {};
    let start =  range['start'];
    let end = range['end'];
    let param = this.dateRangeParam;
    return {[`min_${param}`]: start, [`max_${param}`]: end, start: null, end: null}
  }

}