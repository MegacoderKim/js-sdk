import { Observable } from "rxjs/Observable";
import { IPageData } from "ht-models";
import { expand, map } from "rxjs/operators";
import { empty } from "rxjs/observable/empty";
import {HtRequest} from "../core/request";

export class HtBaseApi {

  constructor(public request: HtRequest) {}

  api$<T>(path, query = {}, options: {isAdmin?: boolean, token?: string} = {}): Observable<T> {
    return this.request.api$(path, query, options);
  }

  postApi$<T>(path: string, body, options: {isAdmin?: boolean, token?: string} = {}): Observable<T> {
    return this.request.postApi$(path, body, options);
  }

  deleteApi$(path: string, options: {isAdmin?: boolean, token?: string} = {}) {
    return this.request.deleteApi$(path, options);
  }

  allPages<T = any>(api$, options: {isAdmin?: boolean, token?: string} = {}) {
    return api$.pipe(
      expand((data: IPageData) => {
        return data.next
          ? this.request.api$(data.next, {}, {...options, pureUrl: true}).pipe(
            map((newData: IPageData) => {
              return {...newData, results: [...data.results, ...newData.results]}
            })
          )
          : empty();
      })
    );
  }
}
