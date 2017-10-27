import {HtQuerySerialize} from "ht-utils";
import {Observable} from "rxjs/Observable";

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

export class HTest {

}

// export const htRequest = (options?) => new HtRequest(options);