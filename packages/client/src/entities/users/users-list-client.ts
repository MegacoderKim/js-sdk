import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";
import {IUserPage} from "ht-models"
import {Observable} from "rxjs/Observable";

export class HtUsersListClient extends HtListClient<IUserPage, HtUsersApi> {

  api$(query) {
    return this.api.index<IUserPage>(query)
  }

}