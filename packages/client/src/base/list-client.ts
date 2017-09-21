import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions, IDateRange, ApiType} from "../interfaces";
import {IUserAnalytics} from "ht-models";
import {HtBaseApi} from "../api/base";
import * as _ from "underscore";

export abstract class HtListClient<T, A> extends HtBaseClient<T, IListClientOptions<A>, A>{

  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      // this.idObservable.data$().startWith(this.options.id),
      this.query$,
      this.options.dateRangeSource$,
      (query, range) => {
        return {...this.getDefaultQuery(), ...query, ...range}
        // return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  // get dataArray$() {
  //   return this.dataObserver.map((pageData) => {
  //     // console.log("page data", pageData);
  //     return pageData ? pageData['results'] : null;
  //   })
  // }

  // get filteredData$() {
  //   return Observable.combineLatest(
  //     this.dataObserver,
  //     this.dataMap$.data$(),
  //     (data, filter) => {
  //       return filter(data)
  //     }
  //   )
  // }
  //
  // get filteredDataArray$() {
  //   return this.filteredData$.map((pageData) => {
  //     // console.log("page data", pageData);
  //     return pageData ? pageData['results'] : null;
  //   })
  // }

  getAll$(type: ApiType) {
    return this.api.all$<IUserAnalytics>({}, type);
  }

  getDefaultQuery() {
    return {page_size: 10, ...super.getDefaultQuery()}
  }

  // getListQuery() {
  //   return this.queryObserver.data$()
  // }

  getData$(query): Observable<T> {
    return this.api$(query).do(() => {
      this.updateLoadingData(false)
    })
      // .expand(() => {
      //   return
      // })
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