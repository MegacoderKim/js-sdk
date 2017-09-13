import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage, IUserPage} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";


export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage | IUserPage, HtUsersApi> {
  //todo IUserPage added as hack to fix usersMarkers$ in client
  entityName = "analytics users";

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  }

  api$(query) {
    return this.api.analytics(query)
  }
}