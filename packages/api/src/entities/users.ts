import { HtBaseApi } from "./base";
import { Observable } from "rxjs/Observable";
import { IUserAnalyticsPage } from "ht-models";

export class HtUsersApi extends HtBaseApi {
  name = "user";
  base = "users";
  constructor(request) {
    super(request);
  }

  get<T>(id: string, query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/${id}/`;
    return this.api$<T>(path, query, {token});
  }

  index<T>(query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/`;
    return this.api$<T>(path, query, {token});
  }

  summary<T>(query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/summary/`;
    return this.api$<T>(path, query, {token});
  }

  heatmap<T>(query = {}, token?: string): Observable<T> {
    let path = `v1/${this.base}/heatmap/`;
    return this.api$(path, query, {token});
  }

  analytics(query, token?: string): Observable<IUserAnalyticsPage> {
    let path = `v1/${this.base}/analytics/`;
    return this.api$<IUserAnalyticsPage>(path, query, {token});
  }

  placeline<T>(id, query = {}, token?: string): Observable<T> {
    let tail = `v1/${this.base}/${id}/placeline/`;
    return this.api$<T>(tail, query, {token});
  }
}
