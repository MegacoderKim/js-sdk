// import {HtRequest} from "../request";
import { Observable } from "rxjs/Observable";
import {IPageData} from "ht-models";
import {AllData, ApiType} from "../interfaces";
import * as _ from "underscore";
import {Page} from "ht-models";
import {apiConfig} from "../client-request";
import {HtRequest} from "../request";
// import {HtClientConfig} from "../config";
// import {HTest, HtRequest} from "../request";
// import {UsersListStorage} from "./storage";

export class HtBaseApi {

  constructor(private base: string) {

  }

  get request(): HtRequest {
    return apiConfig.request
  }

  get<T>(id: string, query = {}): Observable<T> {
    let tail = `/${id}/`;
    return this.getReqFromTail<T>(tail, query)
  }

  index<T>(query = {}): Observable<T> {
    let tail = `/`;
    return this.getReqFromTail<T>(tail, query)
  }

  summary<T>(query = {}): Observable<T> {
    let tail =  `/summary/`;
    return this.getReqFromTail<T>(tail, query)
  }

  heatmap<T>(query = {}): Observable<T> {
    let tail =  `/heatmap/`;
    return this.getReqFromTail<T>(tail, query)
  }

  getReqFromTail<T>(tail, query = {}): Observable<T> {
    return this.request.api$(this.base + tail, query)
  }

  placeline<T>(id, query = {}): Observable<T> {
    let tail = `/${id}/timeline/`;
    return this.getReqFromTail<T>(tail, query)
  }

  all$<T>(query, apiType: ApiType = ApiType.index): Observable<AllData<T>> {
    query = {page_size: 200, ...query};
    let api$ = apiType == ApiType.index ? this.index(query) : this.analytics(query);
    return api$
      .expand((data: IPageData) => {
        let req = this.request.getObservable(data['next']);
        return data['next'] ? req : Observable.empty()
      })
      .map((value: Page<T>) => {
        let resultsEntity = _.indexBy(value.results, 'id');
        let isFirst = !value.previous;
        let count = value.count;
        return {resultsEntity, isFirst, next: value.next, previous: value.previous, count}
      })
      // .scan((acc: AllData<T>, value) => {
      //   // let results = [...acc.results, ...value.results];
      //   let resultsEntity = _.indexBy(value.results, 'id');
      //   let isFirst = Object.keys(acc.resultsEntity).length ? false : true;
      //   let next = value['next'];
      //   return {resultsEntity, isFirst, next}
      // }, {resultsEntity: {}, isFirst: true, next: null})

  }

  analytics(query): Observable<any> {
    return Observable.empty()
  }

  // getObservable(url, options: object = {}): Observable<any> {
  //   return Observable.of({}?
  // }
  //
  //
  // postObservable(url, body, options: object = {}) {
  //   return Observable.of({})
  // }
  //
  // api$(tail: string, query) {
  //   let url = this.request.url(this.base + tail, query);
  //   return this.getObservable(url)
  // }
  //
  // url$(url, query) {
  //   url = this.request.url(url, query);
  //   return this.getObservable(url)
  // }
}
