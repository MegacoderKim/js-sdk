import { HtBaseApi } from "./base";
import { Observable } from "rxjs/Observable";
import { IUserAnalyticsPage, Page, IActionPlaceline, IUserPlaceline, IUser, IAction, IPlaceline } from "ht-models";
import {filter, map} from "rxjs/operators";

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

  placeline(id: string | null, query = {}, token?: string): Observable<IUserPlaceline> {
    const actionQuery = this.actionQuery(query);
    if (actionQuery) {
      let tail = `v2/actions/placeline/`;
      return this.api$(tail, actionQuery).pipe(
        filter((data: Page<IActionPlaceline>) => !!data.results.length),
        map((data: Page<IActionPlaceline>) => {
          return this.convertActionPlacelineToUserPlaceline(data.results[0])
        })
      )
    } else {
      let tail = `v2/${this.base}/${id}/placeline/`;
      return this.api$(tail, query, {token});
    }

  }

  private convertActionPlacelineToUserPlaceline(actionPlaceline: IActionPlaceline): IUserPlaceline {
    let user = actionPlaceline.user as IUser;
    const placeline = actionPlaceline.placeline as IPlaceline[];
    const events = [];
    let action = {...actionPlaceline, placeline: null} as IAction;
    user.location = user.location || action.location;
    user.health = user.health || action.health;
    user.is_tracking = !!action.health && user.is_tracking;
    return {
      ...user,
      actions: [action],
      events,
      placeline,
      timeline_date: null
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
