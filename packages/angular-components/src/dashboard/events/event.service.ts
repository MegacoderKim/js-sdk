import { Injectable } from '@angular/core';
import {HtQuerySerialize} from "../../utils/query-serializer";
import {Observable} from "rxjs/Observable";
import {IEventPage} from "ht-models";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class EventService {

  constructor(
      private http: HttpClient
  ) { }

    index(query: any): Observable<IEventPage> {
      let string   = HtQuerySerialize(query);
      return this.http.get<IEventPage>(`app/v1/events?${string}`)
    }
}
