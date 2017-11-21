import {HtQuerySerialize} from "ht-utility";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";

export class HtRequest {
  baseUrl: string = 'https://api.hypertrack.com/api/v1/';
  subToken: string = '';
  token: string;
  constructor(private isAdmin: boolean = false) {
    // this.currentToken = currentToken || HtClientConfig.currentToken
  }

  setToken(token) {
    this.token = token;
  }

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }

  get currentToken() {
    return this.subToken && !this.isAdmin ? this.subToken : this.token;
  }

  headerObj() {
    return  {'Authorization': `token ${this.currentToken}`}
  }

  headerStrings(): [string, string] {
    return ['Authorization', `token ${this.currentToken}`]
  }

  url(url: string, query = {}) {
    let string = HtQuerySerialize(query);
    return this.baseUrl + url + '?' + string
  }

  getObservable<T>(url, options: object = {}): Observable<T> {
    let p = this.getFetch(url, options);
    return fromPromise(p) as Observable<T>
  }


  postObservable<T>(url, body, options: object = {}): Observable<any> {
    let p = this.postFetch(url, body, options);
    return fromPromise(p) as Observable<T>
  }

  api$<T>(url: string, query) {
    url = this.url(url, query);
    return this.getObservable<T>(url)
  }

  postApi$(url, body, options?) {
    url = this.url(url);
    return this.postObservable(url, body, options)
  }

  getFetch(url, options: object = {}) {
    return fetch(url, {headers: this.headerObj(), ...options}).then(res => res.json())
  }

  postFetch(url, body, options: object = {}) {
    return fetch(url, {headers: this.headerObj(), method: 'POST', body: JSON.stringify(body), ...options})
      .then(res => res.json())
  }

  // fromPromise(promise) {
  //   return Observable.fromPromise(promise)
  // }

}

export class HTest {

}

// export const htRequest = (options?) => new HtRequest(options);