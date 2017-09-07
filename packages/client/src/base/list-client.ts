import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions} from "../interfaces";

export abstract class HtListClient<T, A> extends HtBaseClient<T, IListClientOptions<A>, A>{

  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.idObservable.data$().startWith(this.options.id),
      this.getListQuery(),
      (id, query) => {
        return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  get dataArray$() {
    return this.data$.map((pageData) => {
      return pageData['results']
    })
  }

  getDefaultQuery() {
    return {page_size: 10, ...super.getDefaultQuery()}
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

  abstract api$(query): Observable<T>

}