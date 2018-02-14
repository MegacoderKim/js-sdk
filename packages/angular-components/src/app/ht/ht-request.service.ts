import {Observable} from "rxjs/Observable";
import {HtRequest} from "ht-api";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs/observable/of";

export class HtRequestService extends HtRequest {
  // http;
  constructor(private http: HttpClient, token) {
    super(token)
  }

  getObservable<T>(url, options: object = {}) {
    return this.http.get<T>(url, options);
  }


  postObservable<T>(url, body, options: object = {}) {
    return this.http.post<T>(url, body, options);
  }
}
