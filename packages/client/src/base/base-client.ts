import {IBaseClientOptions, IItemClientOptions, IListClientOptions} from "../interfaces";
import {HtBaseApi} from "../api/base";
import {Observable} from "rxjs/Observable";
import {IdObserver} from "./id-observer";
import {QueryObserver} from "./query-observer";
import {LoadingObserver} from "./loading-observer";
import {HtClientConfig} from "../config";
import {Partial} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {isEmpty} from "rxjs/operator/isEmpty";

export abstract class HtBaseClient<T, O, A> {
  loadingObserver: LoadingObserver;
  queryObserver: QueryObserver;
  idObservable: IdObserver;
  data$: Observable<T>;
  api: A;
  update$: BehaviorSubject<T | null> = new BehaviorSubject(null);
  constructor(
    public options: IBaseClientOptions<A>
  ) {
    this.api = options.api;

    this.queryObserver = new QueryObserver(
      {
        initialData:
          {...this.getDefaultQuery(), ...options.query},
        dataSource$: options.querySource$
      });

    this.loadingObserver = new LoadingObserver(true, options.loadingSource$);
    this.idObservable = new IdObserver(options.id, options.idSource$);
    // this.initListener()
  }

  getDefaultQuery() {
    return this.options.defaultQuery || {}
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
          return queryObj ? this.getData$(queryObj) : Observable.of(false)
        }).do((data) => {
          this.loadingObserver.updateData(false);
          this.update$.next(data);
          // if(!data || data != false) {
          //   if(this.options.onNotFound) this.options.onNotFound();
          // }
        })
        .share();

      this.data$ = data$;
    }
  }

  getUpdate$(data, queryObj: object): Observable<T> {
    return Observable.empty()
  }

  setOptions(options: Partial<IBaseClientOptions<A>> = {}) {
    this.options = {...this.options, ...options};
    this.idObservable.dataSource$ = this.options.idSource$;
    this.idObservable.initialData = this.options.id;
    this.idObservable.updateData(this.options.id);
    let queryOptions = this.getQueryOptions(this.options);
    this.queryObserver.setOptions(queryOptions);
    this.queryObserver.updateData(queryOptions.initialData)

  }

  setId(id: string | null) {
    this.idObservable.initialData = id;
    this.idObservable.updateData(id);
  }

  getQueryOptions(options: IListClientOptions<A>) {
    return {initialData: options.query || {}, dataSource$: options.querySource$}
  }

  getDataQueryWithLoading$(): Observable<object> {
    // console.log("get data query");
    return this.getDataQuery$()
      .map(query => {
        return {...this.getDefaultQuery(), ...query}
      })
      .do((data) => {
      // console.log("query", data);
      // this.update$.next(null);
      this.loadingObserver.updateData(true)
    });
  }

  getDataAndUpdate$(queryObj: object): Observable<T> {
    return this.getData$(queryObj).switchMap((data) => {
      return Observable.merge(
        Observable.of(data),
        this.getDelayUpdate$(queryObj)
      )
    })
    // return Observable.merge(
    //   this.getData$(queryObj),
    //   this.getDelayUpdate$(queryObj)
    // )
  }

  getDelayUpdate$(queryObj: object): Observable<T> {
    return Observable.timer(this.pollDuration)
      .switchMap(() => {
        return this.update$.do(() => {
          console.log("update fired");
        })
      }).switchMap((data) => {
        return data ? this.getUpdate$(data, queryObj) : Observable.empty()
      })
  }

  pauseUpdate() {
    this.update$.next(null)
  }

  get pollDuration(): number {
    return this.options.pollTime || HtClientConfig.pollTime;
  }

  abstract getDataQuery$(): Observable<object>

  abstract getData$(queryObj: object): Observable<T>

}