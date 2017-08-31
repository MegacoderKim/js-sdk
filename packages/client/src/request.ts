import {HtQuerySerialize} from "ht-js-utils";
import {Observable} from "rxjs/Observable";
import {HtClientConfig} from "./config";

export class HtRequest {

  baseUrl: string = 'https://api.hypertrack.com/api/v1/';

  constructor(private token: string = "") {
    this.token = token || HtClientConfig.token
  }

  headerObj() {
    console.log(this.token, "token");
    return  {'Authorization': `token ${this.token}`}
  }

  headerStrings(): [string, string] {
    return ['Authorization', `token ${this.token}`]
  }

  url(url: string, query = {}) {
    let string = HtQuerySerialize(query);
    return this.baseUrl + url + '?' + string
  }

  getObservable(url, options: object = {}): Observable<any> {
    return Observable.of({})
  }


  postObservable(url, body, options: object = {}) {
    return Observable.of({})
  }

  api$(url: string, query) {
    url = this.url(url, query);
    return this.getObservable(url)
  }

  postApi$(url, body, options?) {
    url = this.url(url);
    return this.postObservable(url, body, options)
  }

}

// export const htRequest = (options?) => new HtRequest(options);