import {HtRequest} from "ht-client";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

export class HtFetchRequest extends HtRequest {

  getFetch(url, options: object = {}) {
    return fetch(url, {headers: super.headerObj(), ...options}).then(res => res.json())
  }

  postFetch(url, body, options: object = {}) {
    return fetch(url, {headers: super.headerObj(), method: 'POST', body: JSON.stringify(body), ...options})
      .then(res => res.json())
  }

  getObservable(url, options: object = {}): Observable<any> {
    let p = this.getFetch(url, options);
    return this.fromPromise(p)
  }


  postObservable(url, body, options: object = {}) {
    let p = this.postFetch(url, body, options);
    return this.fromPromise(p)
  }

  fromPromise(promise) {
    return Observable.fromPromise(promise)
  }

}