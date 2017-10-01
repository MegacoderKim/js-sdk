import {IItemClientOptions, IListClientOptions} from "../interfaces";
import {HtBaseApi} from "../api/base";
import {Observable} from "rxjs/Observable";
import {HtClientConfig} from "../config";
import { State} from "../reducers/index";
import { Store} from "../store/store";

export abstract class HtBaseClient<T> {
  api: HtBaseApi;
  name = "base";
  options;

  get store() {
    return this.options.store
  }

  get api$() {
    return this.options.api$
  }

  // abstract get isActive$()

  abstract setData(data): void

  getDefaultQuery(): object {
    return this.options.defaultQuery || {}
  }

  getApiQueryWithLoading$(): Observable<object> {
    return this.getApiQuery$()
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

  abstract getApiQuery$(): Observable<object>

  // abstract getData$(queryObj: object): Observable<T>

  abstract get query$(): Observable<object>

}