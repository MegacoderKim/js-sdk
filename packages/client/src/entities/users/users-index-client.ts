import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";
import {IUserPage, IUser} from "ht-models"
import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";

export class HtUsersIndexClient extends HtListClient<IUserPage> {
  name = "users index";

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersIndexIsActive)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersIndexPage)
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserIndex)
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  }

  setData(usersPage) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexPage(usersPage))
  }

}