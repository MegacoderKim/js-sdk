import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage, IUserPage, IUserAnalytics, IUser} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";

export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage | IUserPage> {
  //todo IUserPage added as hack to fix allMarkers$ in client
  name = "analytics users";
  toUpdate = true;

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsIsActive)
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersAnalyticsPage)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingAnalytics)
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  }

  // api$(query) {
  //   return this.api.analytics(query)
  // }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
  }
}