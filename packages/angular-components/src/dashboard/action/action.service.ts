import { Injectable } from '@angular/core';
import {HtQuerySerialize} from "../../utils/query-serializer";
import {PageService} from "../core/page.service";
import {IActionMapPage, IActionMap, IAction, IUserPlaceline} from "ht-models";
import {Observable} from "rxjs/Observable";
import {GetActionDateRangeQuery} from "../../utils/actions-helpers";
import {GetDateRangeQuery} from "ht-utility";
import {HttpClient} from "@angular/common/http";
import {HtActionsService} from 'ht-angular';

@Injectable()
export class ActionService {

  constructor(
      private http: HttpClient,
      private page: PageService,
      private client: HtActionsService
  ) { }

  indexOnDate(query) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({page_size: 15, ...query}));
    return this.client.api.index(GetActionDateRangeQuery({page_size: 15, ...query}));
    // return this.http.get(`app/actions/?${string}`)
  }

  index(query) {
      let string = HtQuerySerialize({page_size: 15, ...query});
    return this.http.get(`app/actions/?${string}`)
  }

  getAll(query = {}, callback?) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({page_size: 15, ...query, ordering: null}));
    let url = `app/actions/?${string}`;
    return this.page.all(url, callback)
  }

  graph(query) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({...query, ordering: null}));
    return this.http.get(`app/actions/graph/?${string}`)
  }

  overview(query = {}) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({...query, ordering: null}));
    return this.http.get(`app/actions/summary/?${string}`)
  }

  getAction(id) {
    return this.client.api.get(GetActionDateRangeQuery(id));
    // return this.http.get(`app/actions/${id}/`)
  }

  mapList(query = {}, callback?: (userMapPage: IActionMapPage) => any): Observable<IActionMap[]> {
    let string = HtQuerySerialize({page_size: 50, ...query});
    let url = `app/actions/map_list/?${string}`;
    return this.page.all(url, callback)
  }

  getTimeline(action: IAction, query): Observable<IUserPlaceline> {
    let userId = action.user.id; //todo check this
    if (!userId) {
      console.log("BAD TIMELINE CALL", userId, query);
      return Observable.empty();
    }
    let string = HtQuerySerialize({...query, action_id: action.id});
    return this.http.get<IUserPlaceline>(`app/users/${userId}/timeline/?${string}`)
  }

  getHeatmap(query, callback?) {
    let string = HtQuerySerialize(GetDateRangeQuery(query, 'completed_at'));
    return this.page.all(`app/actions/heatmap/?page_size=200&${string}`, callback)
  }

  summary(query) {
    let string = HtQuerySerialize(query);
    return this.http.get(`app/actions/summary/?${string}`)
  }

}
