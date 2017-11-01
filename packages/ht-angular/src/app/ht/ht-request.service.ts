import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HtRequest} from "ht-client";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers} from "@angular/http";

@Injectable()
export class HtRequestService extends HtRequest {
  // http;

  constructor(private http: HttpClient) {
    super()
  }

  getObservable<T>(url, options: object = {}) {
    const obj = super.headerObj();
    const headers = new HttpHeaders(obj);
    return this.http.get<T>(url, {headers});
  }


  postObservable(url, body, options: object = {}) {
    return Observable.of({});
  }
}
