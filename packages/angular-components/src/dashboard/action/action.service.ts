import { Injectable } from '@angular/core';
import {HtQuerySerialize} from "../../utils/query-serializer";
import {PageService} from "../core/page.service";
import {IActionMapPage, IActionMap, IAction, IUserPlaceline} from "ht-models";
import {Observable} from "rxjs/Observable";
import {GetActionDateRangeQuery} from "../../utils/actions-helpers";
import {GetDateRangeQuery, getMergedParams} from "ht-utility";
import {HttpClient} from "@angular/common/http";
import {HtActionsService, HtUsersService} from 'ht-angular';
import {empty} from "rxjs/observable/empty";
import * as fromQuery from "../actions/query";
import * as fromRoot from "../reducers";
import * as fromUser from "../actions/user";
import * as fromAction from "../actions/action";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";

@Injectable()
export class ActionService {

  constructor(
      private http: HttpClient,
      private page: PageService,
      private client: HtActionsService,
      private store: Store<fromRoot.State>,
      private htActionsService: HtActionsService,
      private htUsersService: HtUsersService
  ) { }

  indexOnDate(query) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({page_size: 15, ...query}));
    return this.client.api.index(GetActionDateRangeQuery({page_size: 15, ...query}));
    // return this.http.get(`app/actions/?${string}`)
  }

  updateQuery(query) {
    this.htActionsService.list.setQuery(query);
    this.htActionsService.listAll.setQuery(query);
    this.htActionsService.heatmap.setQuery(query);
    this.store.dispatch(new fromQuery.UpdateActionListQueryQueryAction(query))
  }
  clearQueryKey(key) {
    this.htActionsService.listAll.clearQueryKey(key)
    this.store.dispatch(new fromQuery.ClearActionQueryKeyQueryAction(key))
  }



  index(query) {
      let string = HtQuerySerialize({page_size: 15, ...query});
    return this.http.get(`app/v1/actions/?${string}`)
  }

  // getAll(query = {}, callback?) {
  //   const queryWithDate = GetActionDateRangeQuery({page_size: 15, ...query, ordering: null});
  //   // let string = HtQuerySerialize(queryWithDate);
  //   // let url = `app/actions/?${string}`;
  //   const index$ = this.client.api.index(queryWithDate);
  //   return this.client.api.allPages(index$).do((data) => {
  //     if (callback) callback(data)
  //   })
  //   // return this.page.all(url, callback)
  // }

  graph(query) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({...query, ordering: null}));
    return this.http.get(`app/v1/actions/graph/?${string}`)
  }

  overview(query = {}) {
    let string = HtQuerySerialize(GetActionDateRangeQuery({...query, ordering: null}));
    return this.client.api.summary(GetActionDateRangeQuery({...query, ordering: null}));
    // return this.http.get(`app/actions/summary/?${string}`)
  }

  getAction(id) {
    return this.client.api.get(GetActionDateRangeQuery(id));
    // return this.http.get(`app/actions/${id}/`)
  }

  mapList(query = {}, callback?: (userMapPage: IActionMapPage) => any): Observable<IActionMap[]> {
    let string = HtQuerySerialize({page_size: 50, ...query});
    let url = `app/v1/actions/map_list/?${string}`;
    return this.page.all(url, callback)
  }

  getTimeline(action: IAction, query): Observable<IUserPlaceline> {
    let userId = action.user.id; //todo check this
    if (!userId) {
      console.log("BAD TIMELINE CALL", userId, query);
      return empty();
    }
    let string = HtQuerySerialize({...query, action_id: action.id});
    return this.http.get<IUserPlaceline>(`app/v1/users/${userId}/timeline/?${string}`)
  }

  getHeatmap(query, callback?) {
    let string = HtQuerySerialize(GetDateRangeQuery(query, 'completed_at'));
    return this.page.all(`app/v1/actions/heatmap/?page_size=200&${string}`, callback)
  }

  summary(query) {
    // let string = HtQuerySerialize(query);
    return this.client.api.summary(query);
    // return this.http.get(`app/actions/summary/?${string}`)
  }

  getQueryForRoute(): Observable<object> {
    let query$ = combineLatest(
      this.htUsersService.placeline.actionId$,
      this.htActionsService.list.query$
    ).pipe(
      map(([id, query]) => {
        return getMergedParams({...query, id})
      })
    );
    return  query$
  }

  getQueryFromRoute(route) {
    let query = {
      'status': route['status'],
      'type': route['type'],
      'ordering': route['ordering'],
      'search': route['search']
    };
    return getMergedParams(query)
  };


}
