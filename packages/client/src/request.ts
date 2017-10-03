import {HtQuerySerialize} from "ht-js-utils";
import {Observable} from "rxjs/Observable";
import {HtClientConfig} from "./config";

export class HtRequest {

  baseUrl: string = 'https://api.hypertrack.com/api/v1/';

  constructor(private currentToken: string = "", private isAdmin: boolean = false) {
    // this.token = token || HtClientConfig.token
  }

  setToken(token) {
    HtClientConfig.subToken = token;
    this.currentToken = token
  }

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }

  get token() {
    return this.currentToken && !this.isAdmin ? this.currentToken : HtClientConfig.token;
  }

  headerObj() {
    return  {'Authorization': `token ${this.token}`}
  }

  headerStrings(): [string, string] {
    return ['Authorization', `token ${this.token}`]
  }

  url(url: string, query = {}) {
    let string = HtQuerySerialize(query);
    return this.baseUrl + url + '?' + string
  }

  getObservable<T>(url, options: object = {}): Observable<T> {
    return Observable.empty()
  }


  postObservable(url, body, options: object = {}): Observable<any> {
    return Observable.of({})
  }

  api$<T>(url: string, query) {
    url = this.url(url, query);
    return this.getObservable<T>(url)
  }

  postApi$(url, body, options?) {
    url = this.url(url);
    return this.postObservable(url, body, options)
  }

}

// export const htRequest = (options?) => new HtRequest(options);