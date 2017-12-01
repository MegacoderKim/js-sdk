// import {HtRequest} from "../request";
import { Observable } from "rxjs/Observable";
import {IPageData} from "ht-models";
import {AllData, ApiType} from "../interfaces";
import * as _ from "underscore";
import {Page} from "ht-models";
// import {clientApi} from "../client-request";
import {HtRequest, htRequestService} from "../global/request";
import {expand, map} from "rxjs/operators";
import {empty} from "rxjs/observable/empty";
// import {HtClientConfig} from "../config";
// import {HTest, HtRequest} from "../request";
// import {UsersListStorage} from "./storage";

export class HtBaseApi {
  // request: HtRequest;

  constructor(public base: string) {

  }

  get request() {
    // return ""
    return htRequestService.getInstance()
  }

  get<T>(id: string, query = {}): Observable<T> {
    let path = `${this.base}/${id}/`;
    return this.api$<T>(path, query)
  }

  index<T>(query = {}): Observable<T> {
    let path = `${this.base}/`;
    return this.api$<T>(path, query)
  }

  summary<T>(query = {}): Observable<T> {
    let path =  `${this.base}/summary/`;
    return this.api$<T>(path, query)
  }

  heatmap<T>(query = {}): Observable<T> {
    let path =  `${this.base}/heatmap/`;
    return this.api$(path, query)
  }

  api$<T>(path, query = {}, options = {}): Observable<T> {
    return this.request.api$(path, query, options)
  }

  postApi$<T>(path: string, body, options = {}): Observable<T> {
    return this.request.postApi$(path, body, options)
  }

  // getReqFromTail<T>(tail, query = {}, options = {}): Observable<T> {
  //   return this.request.api$(this.base + tail, query, options)
  // }
  //
  // postReqFromTail<T>(tail, body, options?): Observable<T> {
  //   return this.request.postApi$(this.base + tail, body, options)
  // }

  placeline<T>(id, query = {}): Observable<T> {
    let tail = this.base + `/${id}/placeline/`;
    return this.api$<T>(tail, query)
  }

  all$<T>(query, apiType: ApiType = ApiType.index): Observable<AllData<T>> {
    query = {page_size: 200, ...query};
    let api$ = apiType == ApiType.index ? this.index(query) : this.analytics(query);
    return this.allPages<T>(api$)
      .pipe(
        map((value: Page<T>) => {
          let resultsEntity = _.indexBy(value.results, 'id');
          let isFirst = !value.previous;
          let count = value.count;
          return {resultsEntity, isFirst, next: value.next, previous: value.previous, count}
        })
      )
  }

  allPages<T = any>(api$, options = {}) {
    return api$
      .pipe(
        expand((data: IPageData) => {
          return data['next'] ? this.request.getObservable(data['next'], options) : empty()
        })
      )
  }

  analytics(query): Observable<any> {
    return empty()
  }
}
