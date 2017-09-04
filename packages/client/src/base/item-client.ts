import {QueryObserver} from "./query-observer";
import {LoadingObserver} from "./loading-observer";
import {Observable} from "rxjs/Observable";
import {IItemClientOptions} from "../interfaces";
import {IdObserver} from "./id-observer";
import {HtBaseApi} from "../api/base";
import {Partial} from "ht-models";
import {HtClientConfig} from "../config";

export abstract class ItemClient<T> {
  loadingObserver: LoadingObserver;
  queryObserver: QueryObserver;
  idObservable: IdObserver;
  data$: Observable<T>;
  api: HtBaseApi;
  defaultQuery: object = {};

  constructor(public options: IItemClientOptions) {
    this.api = options.api;
    this.defaultQuery = options.defaultQuery || {};
    this.queryObserver = new QueryObserver(options.queryOptions);
    this.loadingObserver = new LoadingObserver(true, options.loadingSource$);
    this.idObservable = new IdObserver(options.id, options.idSource$);
    // this.initListeners()
  }

  getListener(options: Partial<IItemClientOptions> = {}): Observable<T> {
    this.setOptions(options);
    this.initListener();
    return this.data$
  };

  initListener() {
    if(!this.data$) {
      let data$ = this.getDataQuery$()
        .switchMap(({id, query}) =>  this.getData$(id, query))
        .do((data) => {
          this.loadingObserver.updateData(false);
          if(!data) {
            if(this.options.onNotFound) this.options.onNotFound();
          }
        })
        .share();

      data$.subscribe((data) => {
        if(this.options.onDataUpdate) this.options.onDataUpdate(data);
        this.onDataUpdate(data)
      });

      this.data$ = data$
    };
  }

  getDataQuery$() {
    let dataQuery$ = Observable.combineLatest(
      this.queryObserver.data$().startWith({}),
      this.idObservable.data$(),
      ((query, id) => {
        return {id, query}
      })
    )
      .do((data) => this.loadingObserver.updateData(true));

    return dataQuery$
  }

  setOptions(options: Partial<IItemClientOptions> = {}) {
    this.options = {...this.options, ...options};
    this.idObservable.dataSource$ = this.options.idSource$;
    this.idObservable.initialData = this.options.id;
    this.queryObserver.setOptions(this.options.queryOptions)
  };

  private getData$(id, query) {
    return this.api$(id, query)
      .expand((data: T) => {
        // console.log("expand");
        let pollTime = this.options.pollTime || HtClientConfig.pollTime;
        return Observable.timer(pollTime).switchMap(() => this.api$(id, {...this.defaultQuery, ...query}))
      })

  }

  api$(id, query): Observable<T> {
    return this.api.get<T>(id, {...this.defaultQuery, ...query})
  }

  isNotFound() {
    // console.log("not founct");
  }

  onDataUpdate(data: T) {
    // console.log(data, "data");
  }
}