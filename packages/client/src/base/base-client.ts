import {IBaseClientOptions, IItemClientOptions, IListClientOptions} from "../interfaces";
import {HtBaseApi} from "../api/base";
import {Observable} from "rxjs/Observable";
import {HtClientConfig} from "../config";
import { State} from "../reducers/index";
import { Store} from "../store/store";

export abstract class HtBaseClient<T, O, A> {
  api: HtBaseApi;
  name = "base";

  constructor(
    public options: IBaseClientOptions<A>
  ) {
    this.api = options.api;
    this.initEffects()
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

  getDataQueryWithLoading$(): Observable<object> {
    return this.getDataQuery$()
      .do((data) => {
      this.updateLoadingData(data['id'] || true)
    });
  }

  updateLoadingData(data) {
    this.options.loadingDispatcher(data)
  }

  get pollDuration(): number {
    return this.options.pollTime || HtClientConfig.pollTime;
  }

  abstract getDataQuery$(): Observable<object>

  abstract getData$(queryObj: object): Observable<T>

  abstract get query$(): Observable<object>

}