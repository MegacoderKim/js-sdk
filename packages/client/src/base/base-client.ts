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
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {DataMapObserve} from "./data-map-observe";
import {BaseFilter} from "../filters/base-filter";
import * as fromUser from "../reducers/user-reducer"
import { State} from "../reducers/index";
import { Store} from "../store/store";

export abstract class HtBaseClient<T, O, A> {
  loadingObserver: LoadingObserver;
  // queryObserver: QueryObserver;
  // idObservable: IdObserver;
  // data$: Observable<T | null | boolean>;
  api: HtBaseApi;
  update$: BehaviorSubject<T | null> = new BehaviorSubject(null);
  entityName: string;
  // dataObserver: ReplaySubject<T | boolean> = new ReplaySubject();
  // dataMap$: DataMapObserve;
  dateRangeObserver: QueryObserver;
  name = "base";

  constructor(
    public options: IBaseClientOptions<A>
  ) {
    this.api = options.api;

    // this.queryObserver = new QueryObserver(
    //   {
    //     initialData:
    //       {...this.getDefaultQuery(), ...options.query},
    //     dataSource$: options.querySource$
    //   });
    let loadingOptions = {
      initialData: options.id || false,
      dataSource$: options.loadingSource$
    };
    this.loadingObserver = new LoadingObserver(loadingOptions);
    let idOptions = {
      initialData: options.id,
      dataSource$: options.idSource$
    };
    // this.idObservable = new IdObserver(idOptions);
    // this.dataMap$ = new DataMapObserve();
    this.dateRangeObserver = new QueryObserver({dataSource$: options.dateRangeSource$});
    this.initEffects()
    // this.initListener()
  }

  get store() {
    return this.options.store
  }

  get isActive$() {
    return null
  }

  initEffects() {
    let query$ = this.isActive$ ?
      this.isActive$.switchMap((isActive: boolean) => {
        return isActive ? this.getDataQueryWithLoading$() : Observable.of(null)
      }) : this.getDataQueryWithLoading$();


    let data$ = query$.switchMap((queryObj) => {
      return queryObj ?
        this.getData$(queryObj) : Observable.of(null)
    })
      .do((data) => {
        this.updateLoadingData(false);
        //todo handle not found
      });
    data$.subscribe((userData) => {
      this.options.onDataUpdate(userData)
    });

  }

  getDefaultQuery() {
    return this.options.defaultQuery || {}
  }

  // getListener(options: Partial<IListClientOptions<A>> = {}): Observable<T | null | boolean> {
  //   this.setOptions(options);
  //   this.initListener();
  //   return this.data$
  // };

  // initListener() {
  //   if(!this.data$) {
  //     let data$ = this.getDataQueryWithLoading$()
  //       .switchMap((queryObj) => {
  //         return queryObj ?
  //           this.getData$(queryObj) : Observable.of(false)
  //       })
  //       .do((data) => {
  //         this.loadingObserver.updateData(false);
  //         //todo handle not found
  //         // this.update$.next(data);
  //         // if(!data || data != false) {
  //         //   if(this.options.onNotFound) this.options.onNotFound();
  //         // }
  //       });
  //       // .share();
  //       // .subscribe(this.dataObserver);
  //       // this.dataObserver.subscribe(data$)
  //     data$.subscribe(this.dataObserver);
  //     // this.dataObserver.mapTo(data$);
  //     this.data$ = this.dataObserver.shareReplay(1);
  //   }
  // }

  // clearData() {
  //   this.dataObserver.next(null)
  // }

  getUpdate$(data, queryObj: object): Observable<T> {
    return Observable.empty()
  }

  // setOptions(options: Partial<IBaseClientOptions<A>> = {}) {
  //   this.options = {...this.options, ...options};
  //   this.idObservable.dataSource$ = this.options.idSource$;
  //   this.idObservable.initialData = this.options.id;
  //   this.idObservable.updateData(this.options.id);
  //   // let queryOptions = this.getQueryOptions(this.options);
  //   // this.queryObserver.setOptions(queryOptions);
  //   // this.queryObserver.updateData(queryOptions.initialData)
  //
  // }

  // setId(id: string | null) {
  //   this.idObservable.initialData = id;
  //   this.idObservable.updateData(id);
  // }

  // toggleId(id: string | null) {
  //   this.idObservable.data$().take(1).subscribe((currentId) => {
  //     if(id === currentId) {
  //       this.setId(null)
  //     } else {
  //       this.setId(id)
  //     }
  //   })
  // }

  // getQueryOptions(options: IListClientOptions<A>) {
  //   return {initialData: options.query || {}, dataSource$: options.querySource$}
  // }

  getDataQueryWithLoading$(): Observable<object> {
    // console.log("get data query");
    return this.getDataQuery$()
      .do((data) => {
      // console.log("query", data);
      // this.update$.next(null);
      this.updateLoadingData(data['id'] || true)
    });
  }

  // getAllQueryAndFilter() {
  //   return Observable.combineLatest(
  //     this.getDataQueryWithLoading$(),
  //     this.dataMap$.data$(),
  //     (queryObj, filter) => {
  //       return {queryObj, filter}
  //     }
  //   )
  // }

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
        return this.update$
      }).switchMap((data) => {
        return data ? this.getUpdate$(data, queryObj) : Observable.empty()
      })
  }

  updateLoadingData(data) {
    if(this.options.loadingDispatcher) {
      this.options.loadingDispatcher(data)
    } else {
      this.loadingObserver.updateData(data)
    }
  }

  pauseUpdate() {
    this.update$.next(null)
  }

  get pollDuration(): number {
    return this.options.pollTime || HtClientConfig.pollTime;
  }

  abstract getDataQuery$(): Observable<object>

  abstract getData$(queryObj: object): Observable<T>

  abstract get query$(): Observable<object>

}