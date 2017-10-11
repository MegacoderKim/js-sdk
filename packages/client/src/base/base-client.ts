import {IItemClientOptions, IListClientOptions} from "../interfaces";
import {HtBaseApi} from "../api/base";
import {Observable} from "rxjs/Observable";
import {HtClientConfig} from "../config";
import { State} from "../reducers/index";
import { Store} from "../store/store";
import * as _ from "underscore";

export abstract class HtBaseClient<T> {
  api: HtBaseApi;
  name = "base";
  options;
  allowedQueryKeys: string[];

  get store() {
    return this.options.store
  }

  get api$() {
    return this.options.api$
  }

  // abstract get active$()

  abstract setData(data): void

  getDefaultQuery(): object {
    return this.options.defaultQuery || {}
  }

  getApiQueryWithLoading$(): Observable<object> {
    return this.getApiQuery$()
      .do((data) => {
      let loading = data && data['id'] ? data['id'] : true;
      this.updateLoadingData(loading)
    });
  }

  updateLoadingData(data) {
    this.options.loadingDispatcher(data)
  }

  protected get allowedQuery$() {
    let queryStore$ = this.query$;
    if(this.allowedQueryKeys && this.allowedQueryKeys.length) {
      let keys$ = _.map(this.allowedQueryKeys, (key: string) => {
        return queryStore$
          .map(store => store ? store[key] : null)
          .distinctUntilChanged()
          .map(value => {
            return value ? {[key]: value} : null
          })
      });
      return Observable.combineLatest(...keys$).map(obsArray => {
        return _.reduce(obsArray, (acc, query) => {
          return query ? {...acc, ...query} : acc
        }, {});
      })
    } else if(this.allowedQueryKeys) {
      return Observable.of({})
    } else {
      return queryStore$
    }
  }

  get pollDuration(): number {
    return this.options.pollTime || HtClientConfig.pollTime;
  }

  abstract getApiQuery$(): Observable<object>

  // abstract getData$(queryObj: object): Observable<T>

  abstract get query$(): Observable<object>

}