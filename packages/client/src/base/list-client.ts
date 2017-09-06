import {Observable} from "rxjs/Observable";
import {HtBaseClient} from "./base-client";
import {IListClientOptions} from "../interfaces";
import {QueryObserver} from "./query-observer";
import {LoadingObserver} from "./loading-observer";
import {IdObserver} from "./id-observer";

export abstract class HtListClient<T, A> extends HtBaseClient<T, IListClientOptions<A>, A>{

  // constructor(
  //   public options: IListClientOptions
  // ) {
  //   super();
  //   this.api = options.api;
  //   this.defaultQuery = options.defaultQuery || {};
  //   this.queryObserver = new QueryObserver(options.queryOptions);
  //   this.loadingObserver = new LoadingObserver(true, options.loadingSource$);
  //   this.idObservable = new IdObserver(options.id, options.idSource$);
  // }

  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.idObservable.data$().startWith(this.options.id),
      this.getListQuery().startWith(this.options.query),
      (id, query) => {
        return id ? {id, ...query} : query
      }
    );
    return dataQuery$
  }

  getListQuery() {
    return this.queryObserver.data$()
  }

  getData$(query): Observable<T> {
    return this.api$(query)
      // .expand(() => {
      //   return
      // })
  }



  abstract api$(query): Observable<T>

}