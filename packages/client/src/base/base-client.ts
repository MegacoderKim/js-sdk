import {IBaseClientOptions, IItemClientOptions, IListClientOptions} from "../interfaces";
import {HtBaseApi} from "../api/base";
import {Observable} from "rxjs/Observable";
import {IdObserver} from "./id-observer";
import {QueryObserver} from "./query-observer";
import {LoadingObserver} from "./loading-observer";
import {HtClientConfig} from "../config";
import {Partial} from "ht-models";

export abstract class HtBaseClient<T, O, A> {
  loadingObserver: LoadingObserver;
  queryObserver: QueryObserver;
  idObservable: IdObserver;
  data$: Observable<T>;
  api: A;
  defaultQuery: object = {};
  selectedIdObserver: IdObserver;
  constructor(
    public options: IBaseClientOptions<A>
  ) {
    this.api = options.api;
    this.defaultQuery = options.defaultQuery || {};
    this.queryObserver = new QueryObserver({initialData: options.query, dataSource$: options.querySource$});
    this.loadingObserver = new LoadingObserver(true, options.loadingSource$);
    this.idObservable = new IdObserver(options.id, options.idSource$);
  }

  getListener(options: Partial<IListClientOptions<A>> = {}): Observable<T> {
    this.setOptions(options);
    this.initListener();
    return this.data$
  };

  initListener() {
    if(!this.data$) {
      let data$ = this.getDataQueryWithLoading$()
        .switchMap((queryObj) => {
          return this.getData$(queryObj)
        }).do((data) => {
          this.loadingObserver.updateData(false);
          if(!data) {
            if(this.options.onNotFound) this.options.onNotFound();
          }
        })
        .share();

      this.data$ = data$;
    }
  }

  setOptions(options: Partial<IBaseClientOptions<A>> = {}) {
    this.options = {...this.options, ...options};
    this.idObservable.dataSource$ = this.options.idSource$;
    this.idObservable.initialData = this.options.id;
    let queryOptions = this.getQueryOptions(this.options);
    this.queryObserver.setOptions(queryOptions)
  }

  getQueryOptions(options: IListClientOptions<A>) {
    return {initialData: options.query || {}, dataSource$: options.querySource$}
  }

  getDataQueryWithLoading$(): Observable<object> {
    console.log("get data query");
    return this.getDataQuery$().do((data) => {
      console.log("query", data);
      this.loadingObserver.updateData(true)
    });
  }

  abstract getDataQuery$(): Observable<object>

  abstract getData$(queryObj: object): Observable<T>

}