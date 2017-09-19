import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";
import {IUserPage} from "ht-models"
import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";

export class HtUsersIndexClient extends HtListClient<IUserPage, HtUsersApi> {
  name = "users index";

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  }

  api$(query) {
    return this.api.index<IUserPage>(query)
  }

}