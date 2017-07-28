import {HtQuerySerialize} from "ht-js-utils";
import {Observable} from "rxjs/Observable";

export class HtRequest {

  baseUrl: string = 'https://api.hypertrack.com/api/v1/';

  constructor(private token, private options?) {

  }

  headerObj() {
    return  {'Authorization': `token ${this.token}`}
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

export const htRequest = (token: string, options?) => new HtRequest(token, options);