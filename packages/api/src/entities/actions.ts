import { HtBaseApi } from "./base";
import {Observable} from "rxjs/Observable";
import {IActionStatusGraph, IAction, ITrackAction, Page} from "ht-models";
import {map} from "rxjs/operators";

export class HtActionsApi extends HtBaseApi {
  name = "Action";
  base = "actions";
  constructor(request) {
    super(request);
  }

  get<T>(id: string, query = {}, token?: string): Observable<T> {
    let path = `v2/${this.base}/${id}/`;
    return this.api$<T>(path, query, {token});
  }

  index<T>(query = {}, token?: string): Observable<T> {
    let path = `v2/${this.base}/`;
    return this.api$<T>(path, query, {token});
  }

  summary<T>(query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/summary/`;
    return this.api$<T>(path, query, {token});
  }

  heatmap<T>(query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/heatmap/`;
    return this.api$(path, query, {token});
  };

  // placeline<T>(id, query = {}, token?: string): Observable<T> {
  //   let tail =  `v1/${this.base}/${id}/placeline/`;
  //   return this.api$<T>(tail, query, {token});
  // }

  graph(query, token?: string): Observable<IActionStatusGraph[]> {
    let path = `v1/${this.base}/graph/`;
    return this.api$(path, query, {token}).pipe(
      map(obj => {
        return Object.keys(obj).reduce((dataArray: IActionStatusGraph[], key: string) => {
          dataArray.push(obj[key]);
          return dataArray
        }, []).sort((a, b) => {
          return new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
        })
      })
    );
  };

  track(query, token?: string): Observable<IAction[]> {
    const path = `v2/${this.base}/track/`;
    return this.api$(path, query, {token}).pipe(
      map((data: Page<IAction>) => {
        return data.results
      })
    );
  }
}

export const htActionsApi = (request) => new HtActionsApi(request);
