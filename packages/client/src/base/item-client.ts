import {QueryObserver} from "./query-observer";
import {LoadingObserver} from "./loading-observer";
import {Observable} from "rxjs/Observable";
import {IItemClientOptions} from "../interfaces";
import {IdObserver} from "./id-observer";
import {HtBaseApi} from "../api/base";
import {Partial} from "ht-models";

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




  initListeners(options: Partial<IItemClientOptions> = {}) {
    this.setOptions(options);
    if(!this.data$) {
      this.data$ = Observable.combineLatest(
        this.queryObserver.data$().startWith({}),
        this.idObservable.data$(),
        ((query, id) => {
          return {id, query}
        })
      )
        .do((data) => this.loadingObserver.updateData(true))
        .switchMap(({id, query}) =>  this.getData$(id, query))
        .do((data) => {
          this.loadingObserver.updateData(false);
          if(!data) {
            this.isNotFound()
          }
        })
    }

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
        return Observable.timer(10000).switchMap(() => this.api$(id, {...this.defaultQuery, ...query}))
      })

  }

  api$(id, query) {
    return this.api.get<T>(id, {...this.defaultQuery, ...query})
  }

  isNotFound() {
    console.log("not founct");
  }
}