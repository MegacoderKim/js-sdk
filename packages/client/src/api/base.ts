import {HtRequest} from "../request";
import { Observable } from "rxjs/Observable";
import {IPageData} from "ht-models";

export class HtBaseApi {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  request;

  constructor(private base: string, request: HtRequest) {
    this.setRequest(request)
  }

  setRequest(request) {
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

  all$<T>(onUpdate = (data, isFirst) => {}, onComplete = (data) => {}): Observable<any> {
    return this.analytics({page_size: 100})
      .do((data) => {
        onUpdate(data, true)
      })
      .expand((data: IPageData) => {
        let req = this.request.getObservable(data['next']).do((data) => {
          onUpdate(data, false)
        });
        return data['next'] ? req : Observable.empty()
      }).scan((acc, value) => {
        return [...acc, ...value.results]
      }, []).do((data) => {
        onComplete(data)
      })
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
