import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";


export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage, HtUsersApi> {
  api$(query) {
    return this.api.analytics(query)
  }
}