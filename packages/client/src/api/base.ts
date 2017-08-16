import {HtRequest} from "../request";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

export class HtBaseApi {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  request;

  constructor(private base: string, request) {
    this.setRequest(request)
  }

  setRequest(request) {
    this.request = request;
  }

  get(id: string, query) {
    let tail = `/${id}/`;
    return this.getReqFromTail(tail, query)
  }

  index(query) {
    let tail = `/`;
    return this.getReqFromTail(tail, query)
  }

  summary(query) {
    let tail =  `/summary/`;
    return this.getReqFromTail(tail, query)
  }

  heatmap(query) {
    let tail =  `/heatmap/`;
    return this.getReqFromTail(tail, query)
  }

  getReqFromTail(tail, query) {
    return this.request.api$(this.base + tail, query)
  }

  placeline(id, query) {
    let tail = `/timeline/${id}/`;
    return this.getReqFromTail(tail, query)
  }

  // getObservable(url, options: object = {}): Observable<any> {
  //   return Observable.of({})
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
