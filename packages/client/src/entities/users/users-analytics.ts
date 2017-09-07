import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";


export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage, HtUsersApi> {

  getDefaultQuery() {
    return {ordering: "-last_heartbeat_at", ...super.getDefaultQuery()}
  }

  api$(query) {
    return this.api.analytics(query)
  }
}