import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Page} from "ht-models";
import {of} from "rxjs/observable/of";
import {concatMap, map} from "rxjs/operators";

@Injectable()
export class PageService {

  constructor(private http: HttpClient) { }

  all(url, callback?, options?) {
    options = options || {};
    return this.http.get<Page<any>>(url, options).pipe(
      concatMap((data) => {
        if(callback) {
          callback(data);
        }
        if (data['next']) {
          return this.all(data['next'], callback, options)
            .pipe(
              map((resultsToJoin: any[]) => {
                return [...data['results'], ...resultsToJoin]
              })
            );
        } else {
          return of(data['results']);
        }
      })
    );
  }
}
