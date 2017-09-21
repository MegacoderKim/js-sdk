import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions, IDateRange, ApiType} from "../interfaces";
import {IUserAnalytics} from "ht-models";
import {HtBaseApi} from "../api/base";
import * as _ from "underscore";

export abstract class HtListClient<T, A> extends HtBaseClient<T, IListClientOptions<A>, A>{

  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.query$,
      this.options.dateRangeSource$,
      (query, range) => {
        return {...this.getDefaultQuery(), ...query, ...range}
        // return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  getAll$(type: ApiType) {
    return this.api.all$<IUserAnalytics>({}, type);
  }

  getDefaultQuery() {
    return {page_size: 10, ...super.getDefaultQuery()}
  }

  getData$(query): Observable<T> {
    return this.api$(query).do(() => {
      this.updateLoadingData(false)
    })

  }

  setFilter(filterResults = (data) => true) {
    let filter = (pageData) => {
      let results = _.filter(pageData.results, (data) => {
        return filterResults(data)
      });
      return {...pageData, results}
    };
    // todo update data map
    // this.dataMap$.updateData(filter);
  }

  abstract api$(query): Observable<T>

  abstract get data$()

  abstract get loading$()

}