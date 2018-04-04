import {Component} from '@nestjs/common';
import {HtApi, HtRequest} from 'ht-api';
import fetch from 'node-fetch';
import {PageResults$} from 'ht-data';
import {Observable} from 'rxjs/Observable';
import {Page} from 'ht-models';
import {map} from 'rxjs/operators';
import * as _ from "underscore";

@Component()
export class ApiService {
  api;
  request;
  constructor() {
    const request = new HtRequest();
    request.getFetch = (url, options) => {
      return fetch(url, options).then(res => res.json());
    };
    const api = new HtApi(request);
    // api.request.baseUrl = "https://api.hypertrack.com/api/v2/";
    this.api = api;
  };

  setToken(token) {
    this.api.setToken(token)
  }

  keysToValues<T>(keys, api$: (query: object) => Observable<Page<T>>) {
    let query = {id: keys.toString()};
    return api$(query).pipe(
      PageResults$,
      map((results) => {
        let resultsEntity = _.indexBy(results, 'id');
        return keys.map((key) => resultsEntity[key])
      })
    )
  }
}