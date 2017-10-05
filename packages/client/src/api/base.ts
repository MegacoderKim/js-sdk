import {HtRequest} from "../request";
import { Observable } from "rxjs/Observable";
import {IPageData} from "ht-models";
import {AllData, ApiType} from "../interfaces";
import * as _ from "underscore";
import {Page} from "../../../models/src/common";

export class HtBaseApi {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  request;

  constructor(private base: string, request: HtRequest, isAdmin: boolean = false) {
    this.setRequest(request, isAdmin)
  }

  setRequest(request, isAdmin) {
    if(isAdmin) request.setIsAdmin(isAdmin);
    this.request = request;
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
    query = {page_size: 100, ...query};
    let api$ = apiType == ApiType.index ? this.index(query) : this.analytics(query);
    return api$
      .expand((data: IPageData) => {
        let req = this.request.getObservable(data['next']);
        return data['next'] ? req : Observable.empty()
      })
      .map((value: Page<T>) => {
        let resultsEntity = _.indexBy(value.results, 'id');
        let isFirst = !value.previous;
        return {resultsEntity, isFirst, next: value.next, previous: value.previous}
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
