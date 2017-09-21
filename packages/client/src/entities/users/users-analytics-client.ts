import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage, IUserPage, IUserAnalytics, IUser} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";

export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage | IUserPage, HtUsersApi> {
  //todo IUserPage added as hack to fix allMarkers$ in client
  entityName = "analytics users";

  get IsActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsIsActive)
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

  api$(query) {
    return this.api.analytics(query)
  }
}