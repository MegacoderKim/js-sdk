import { Observable } from "rxjs/Observable";
import { IPageData } from "ht-models";
import { expand, map } from "rxjs/operators";
import { empty } from "rxjs/observable/empty";
import {HtRequest} from "../core/request";

export class HtBaseApi {

  constructor(public request: HtRequest, public base: string) {}

  get<T>(id: string, query = {}): Observable<T> {
    let path = `${this.base}/${id}/`;
    return this.api$<T>(path, query);
  }

  index<T>(query = {}): Observable<T> {
    let path = `${this.base}/`;
    return this.api$<T>(path, query);
  }

  summary<T>(query = {}): Observable<T> {
    let path = `${this.base}/summary/`;
    return this.api$<T>(path, query);
  }

  heatmap<T>(query = {}): Observable<T> {
    let path = `${this.base}/heatmap/`;
    return this.api$(path, query);
  }

  api$<T>(path, query = {}, options: {isAdmin?: boolean, token?: string} = {}): Observable<T> {
    return this.request.api$(path, query, options);
  }

  postApi$<T>(path: string, body, options: {isAdmin?: boolean, token?: string} = {}): Observable<T> {
    return this.request.postApi$(path, body, options);
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
    return this.api$<T>(tail, query);
  }

  allPages<T = any>(api$, options: {isAdmin?: boolean, token?: string} = {}) {
    return api$.pipe(
      expand((data: IPageData) => {
        return data["next"]
          ? this.request.api$(data["next"], {}, options).pipe(
            map((newData: IPageData) => {
              return {...newData, results: [...data.results, ...newData.results]}
            })
          )
          : empty();
      })
    );
  }

  analytics(query): Observable<any> {
    return empty();
  }
}
