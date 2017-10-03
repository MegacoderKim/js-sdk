import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";
import {IUserPage, IUser} from "ht-models"
import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as _ from "underscore";

export class HtUsersIndexClient extends HtListClient<IUserPage> {
  name = "users index";

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersIndexIsActive)
  }

  get data$(): Observable<any> {
    return this.store.select(fromRoot.getUsersIndexPage)
  }

  get query$() {

    let queryStore$ = this.store.select(fromRoot.getQueryUserQuery);
    if(this.allowedQueryKeys && this.allowedQueryKeys.length) {
      let keys$ = _.map(this.allowedQueryKeys, (key: string) => {
        return queryStore$
          .map(store => store ? store[key] : null)
          .distinctUntilChanged()
          .map(value => {
            return value ? {[key]: value} : null
          })
      });
      return Observable.combineLatest(...keys$).map(obsArray => {
        return _.reduce(obsArray, (acc, query) => {
          return query ? {...acc, ...query} : acc
        }, {});
      })
    } else if(this.allowedQueryKeys) {
      return Observable.of({})
    } else {
      return this.store.select(fromRoot.getQueryUserQuery)
    }

  }

  get loading$() {
    return this.store.select(fromRoot.getLoadingUserIndex)
  }

  getDefaultQuery(): object {
    return {...super.getDefaultQuery(), ordering: "-last_heartbeat_at"}
  }

  setData(usersPage) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersIndexPage(usersPage))
  }

}