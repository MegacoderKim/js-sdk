import {Injectable} from "@angular/core";
import {HtQuerySerialize} from "../../utils/query-serializer";
import {Observable} from "rxjs/Observable";
import {
  IPlaceHeatPage,
  IUserAnalytics,
  IUserPlaceline,
  IUserListSummary,
  IUserMap,
  IUserMapPage,
  IUserPage,
  IUserPlace,
  Page,
  IUser,
} from "ht-models";
import {PageService} from "../core/page.service";
import {GetUserDateRangeQuery, GetUserStatusString} from "../../utils/users";
import * as fromRoot from "../reducers";
import * as fromUser from "../actions/user";
import {Store} from "@ngrx/store";
import {UserTraceService} from "./user-trace.service";
import {HttpClient} from "@angular/common/http";
import {config} from "../config";
import {startOfDay, endOfDay, format} from 'date-fns';
import {HtUsersService} from "ht-angular";
import * as fromQuery from "../actions/query";
import {getMergedParams} from "ht-utility";
import {combineLatest} from "rxjs/observable/combineLatest";
import {map, tap} from "rxjs/operators";

@Injectable()
export class UserService {

  constructor(
      private http: HttpClient,
      private store: Store<fromRoot.State>,
      private userTrace: UserTraceService,
      private page: PageService,
      private client: HtUsersService,
      private htUsersService: HtUsersService
  ) { }

  // getUserTimeLine(userId: string, query: any = {}): Observable<IUserPlaceline> {
  //   // if (!userId) {
  //   //   console.log("BAD TIMELINE CALL", userId, query);
  //   //   return empty();
  //   // }
  //   // const date = query ? query.date : null;
  //   // query = this.addTimeRangeForPlaceline(query);
  //   // let string = HtQuerySerialize(query);
  //   // const v = config.placelinev2 ? '_v2' : '';
  //   // return this.client.api.placeline(userId, query).map((data: IUserPlaceline) => {
  //   //   return date ? {...data, timeline_date: date} : data;
  //   // })
  //
  //   // return this.http.get(`app/users/${userId}/placeline${v}/?${string}`).map((res) => res.json());
  // };

  setQuery(query) {
    this.htUsersService.list.setQuery(query);
    this.store.dispatch(new fromQuery.UpdateUserListQueryQueryAction(query))
  }

  clearQuerykey(key) {
    this.htUsersService.list.clearQueryKey(key);
    this.store.dispatch(new fromQuery.ClearUserQueryKeyQueryAction(key))
  }

  private addTimeRangeForPlaceline(query): object {
    if (!query || (query && !query.date)) return query;
    var dateArray = query.date.split("-");
    const date = new Date(dateArray[0], +dateArray[1] - 1, dateArray[2]);
    const start = startOfDay(date).toISOString();
    const end = endOfDay(date).toISOString();
    return {...query, min_recorded_at: start, max_recorded_at: end, date: null};
  }

  getUserAnalytics(query: any = {}): Observable<Page<IUser>> {
    let string = HtQuerySerialize({page_size: 15, ...GetUserDateRangeQuery(query) });
    return this.client.api.analytics({page_size: 15, ...GetUserDateRangeQuery(query) });
  }

  getAllUserAnalytics(query = {}, callback?) {
    let string = HtQuerySerialize({page_size: 100, ...GetUserDateRangeQuery(query)});
    const analytics$ = this.client.api.analytics({page_size: 100, ...GetUserDateRangeQuery(query)});
    return this.client.api.allPages(analytics$).pipe(
      tap((data: Page<IUser>) => {
        data.next = null;
        if (callback) callback(data)
      })
    )
    // return this.client.api.analytics({page_size: 100, ...GetUserDateRangeQuery(query)}).do((data: Page<IUser>) => {
    //   data.next = null;
    //   if (callback) callback(data)
    // })
    // return this.client.api.allPages(this.client.api.index({page_size: 100, ...GetUserDateRangeQuery(query)})).do((data) => {
    //   if (callback) callback(data)
    // })
  }

  getUserListSummary(query: any = {}): Observable<IUserListSummary> {
    let string = HtQuerySerialize(query);
    return this.client.api.summary(query);
  }

  device(id) {
    return this.http.get(`app/v1/users/${id}/device/`)
  }

  overview(query: object = {}) {
    let string = HtQuerySerialize(query);
    return this.http.get(`app/v1/users/overview/?${string}`)
  }

  index(query = {}): Observable<Page<IUser>> {
    let string = HtQuerySerialize({page_size: 50, ...query});
    console.log(this.client.api.request.baseUrl);
    return this.client.api.index({page_size: 50, ...query})
  }

  placeList(query = {}, callback?: (userPlacePage) => any) {
    query = GetUserDateRangeQuery(query);
    let string = HtQuerySerialize({page_size: 200, ...query});
    // let url = `app/users/heatmap/?${string}`;
    const heat$ = this.client.api.heatmap({page_size: 200, ...query});
    return this.client.api.allPages(heat$).pipe(
      tap((data) => {
        if (callback) callback(data)
      })
    )
  }

  mapList(query = {}, callback?: (userMapPage: IUserMapPage) => any): Observable<IUserMap[]> {
    let string = HtQuerySerialize({page_size: 50, ...query});
    let url = `app/v1/users/map_list/?${string}`;
    return this.page.all(url, callback)
  }

  summary(query: object = {}) {
    let string = HtQuerySerialize(GetUserDateRangeQuery({...query, ordering: null}));
    return this.client.api.summary(GetUserDateRangeQuery({...query, ordering: null}));
    // return this.http.get<IUserListSummary>(`app/users/summary/?${string}`);
  }

  getUserPlaceFilter(query: object) {
    if(query['search']) {
      return (userPlace: IUserPlace) => userPlace.name.indexOf(query['search']) > -1
    } else {
      return (userPlace) => true;
    }
    //todo add more when filters are added
  }

  getPlaceList(query, userId: string | null = null) {
    console.log(query, "map");
    var userPlaceCb = (userPlacePage: IPlaceHeatPage) => {
      if(userPlacePage.previous) {
        userId ? this.store.dispatch(new fromUser.SetSelectedUserPlace(userPlacePage.results)) : this.store.dispatch(new fromUser.UpdateUserPlace(userPlacePage.results))
      } else {
        userId ? this.store.dispatch(new fromUser.SetSelectedUserPlace(userPlacePage.results)) : this.store.dispatch(new fromUser.SetUserPlace(userPlacePage.results));
      }
      // this.store.dispatch(new fromUser.ClearUsersMapAction());
    };

    return this.placeList({min_recorded_at: query['start'], max_recorded_at: query['end'], ...query, start: null, end: null, id: userId}, userPlaceCb)
  }

  getValueString(status: string): string {
    return GetUserStatusString(status)
  };

  getQueryFromRoute(route) {
    let query = {
      'status': route['status'],
      'show_all': !!route['show_all'],
      'ordering': route['ordering'],
      'search': route['search']
    };
    return getMergedParams(query)
  };

  getQueryForRoute(): Observable<object> {
    let query$ = combineLatest(
      this.htUsersService.placeline.id$,
      this.htUsersService.list.query$
    ).pipe(
      map(([id, query]) => {
        return getMergedParams({...query, id})
      })
    );
    return  query$
  }
}
