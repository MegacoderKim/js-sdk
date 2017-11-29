import {Observable} from "rxjs/Observable";
import {HtRequest} from "ht-client";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs/observable/of";

export class HtRequestService extends HtRequest {
  // http;

  constructor(private http: HttpClient) {
    super()
  }

  getObservable<T>(url, options: object = {}) {
    const headers = super.headerObj();
    // const headers = new HttpHeaders(obj);
    return this.http.get<T>(url, {headers});
  }


  postObservable(url, body, options: object = {}) {
    return of({});
  }
}
