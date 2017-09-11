import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions} from "../interfaces";
import {IUserAnalytics} from "ht-models";
import {HtBaseApi} from "../api/base";
import * as _ from "underscore";

export abstract class HtListClient<T, A> extends HtBaseClient<T, IListClientOptions<A>, A>{

  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      // this.idObservable.data$().startWith(this.options.id),
      this.getListQuery(),
      (query) => {
        return query
        // return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  get dataArray$() {
    return this.dataObserver.map((pageData) => {
      // console.log("page data", pageData);
      return pageData ? pageData['results'] : null;
    })
  }

  get allArray$() {
    console.log(this.api, "api");
    return Observable.of(3)

  }

  getAll$() {
    return this.api.all$<IUserAnalytics>({});
    // return this.api$({page_size: 100})
    //   .expand((data) => {
    //     console.log("expand", data);
    //     const  r = this.api.all$();
    //     console.log(r);
    //     // let next = this.api.api$(data['next'])
    //     return data['next'] ? r : Observable.empty()
    //   })
  }

  getDefaultQuery() {
    return {page_size: 15, ...super.getDefaultQuery()}
  }

  getListQuery() {
    return this.queryObserver.data$()
  }

  getData$(query): Observable<T> {
    return this.api$(query).do(() => {
      this.loadingObserver.updateData(false)
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
    this.filter$.updateData(filter);
  }

  abstract api$(query): Observable<T>

}