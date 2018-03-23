import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Page} from "ht-models";

@Injectable()
export class PageService {

  constructor(private http: HttpClient) { }

  all(url, callback?, options?) {
    options = options || {};
    return this.http.get<Page<any>>(url, options)
        .concatMap((data) => {
          if(callback) {
            callback(data);
          }
          if (data['next']) {
            return this.all(data['next'], callback, options)
                .map(resultsToJoin => {
                  return [...data['results'], ...resultsToJoin]
                });
          } else {
            return Observable.of(data['results']);
          }
        });
  }
}
