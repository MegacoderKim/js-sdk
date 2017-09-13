import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";


export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage, HtUsersApi> {
  entityName = "analytics users";

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  }

  api$(query) {
    return this.api.analytics(query)
  }
}