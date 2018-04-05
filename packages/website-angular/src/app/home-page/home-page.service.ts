import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class HomePageService {

  constructor(private http: Http) { }

  getMetrics() {
    let url = `https://api.hypertrack.com/api/v1/metrics/overall/`;
    return this.http.get(url).filter(data => !!data).map(res => res.json());
  }


}
