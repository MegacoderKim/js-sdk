import { HtBaseApi } from "./base";
import { Observable } from "rxjs/Observable";
import { IUserAnalyticsPage, Page, IActionPlaceline, IUserPlaceline, IUser, IAction, IPlaceline, IUserDevice } from "ht-models";
import {filter, map} from "rxjs/operators";
import {isToday, startOfToday, endOfToday} from "date-fns";
import {htPlaceline} from "ht-data";

export class HtUsersApi extends HtBaseApi {
  name = "user";
  base = "users";
  constructor(request) {
    super(request);
  }

  get<T>(id: string, query = {}, token?: string): Observable<T> {
    let path = `v2/${this.base}/${id}/`;
    return this.api$<T>(path, query, {token});
  }

  index<T>(query = {}, token?: string): Observable<T> {
    let path = `v2/${this.base}/`;
    return this.api$<T>(path, query, {token});
  }

  summary<T>(query = {}, token?: string): Observable<T> {
    let path = `v2/${this.base}/summary/`;
    return this.api$<T>(path, query, {token});
  }

  heatmap<T>(query = {}, token?: string): Observable<T> {
    let path = `v2/${this.base}/heatmap/`;
    return this.api$(path, query, {token});
  }

  analytics(query, token?: string): Observable<IUserAnalyticsPage> {
    let path = `v2/${this.base}/analytics/`;
    return this.api$<IUserAnalyticsPage>(path, query, {token});
  }

  device(id, token?: string): Observable<IUserDevice> {
    let path = `v1/${this.base}/${id}/device/`;
    return this.api$(path, {}, {token});
  }

  placeline(id: string | null, query = {}, token?: string): Observable<IUserPlaceline> {
    const actionQuery = this.actionQuery(query);
    if (actionQuery) {
      let tail = `v2/actions/placeline/`;
      return this.api$(tail, actionQuery).pipe(
        filter((data: Page<IActionPlaceline>) => !!data.results.length),
        map((data: Page<IActionPlaceline>) => {
          return data && data.results.length ? htPlaceline().procActionPlaceline(data.results[0]) : null;
        })
      )
    } else {
      let tail = `v2/${this.base}/${id}/placeline/`;
      query = this.fillPlacelineQuery(query);
      return this.api$(tail, query, {token}).pipe(
        map((data: IUserPlaceline) => {
          return htPlaceline().procUsersPlaceline(data, query)
        })
      );
    }

  };

  private fillPlacelineQuery(query: object): object {
    if (!query['min_recorded_at'] || !query['max_recorded_at']) {
      return  {
        min_recorded_at: startOfToday().toISOString(),
        max_recorded_at: endOfToday().toISOString(),
        ...query,
      }
    } else {
      return query
    }
  }

  private actionQuery(query): object | null {
    if (query['action_id']) {
      return {id: query['action_id']}
    } else if (query['action_collection_id']) {
      return {collection_id: query['action_collection_id']}
    } else if(query['action_unique_id']) {
      return {unique_id: query['action_unique_id']}
    };
    return null;
  }
}
