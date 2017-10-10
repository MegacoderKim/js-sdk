import {HtListClient} from "../../base/list-client";
import {HtUsersApi} from "../../api/users";
import {IUserPage, IUser} from "ht-models"
import {Observable} from "rxjs/Observable";
import {ApiType} from "../../interfaces";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import * as _ from "underscore";
import {HEntityState, HEntityType, IDispatchers, ISelectors} from "../base/interfaces";
import {HUsersList} from "./users-interface";
import {HListFactory} from "../base/list-client";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {UsersIndex, UsersIndexFactory} from "./users-index-interfaces";
import {EntityListState, EntityTypeConfig, ListDispatchers, ListSelectors} from "../base/arc";

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

export const UsersIndexClientFactory: UsersIndexFactory = (state: EntityListState, config: Partial<EntityTypeConfig> = {}): UsersIndex => {
  let innerConfig = {
    name: 'users analytics',
    defaultQuery: {ordering: '-last_heartbeat_at'},
    ...config
  };

  let {api$, store} = state;

  let selectors: ListSelectors = {
    query$: store.select(fromRoot.getQueryUserQuery),
    data$: store.select(fromRoot.getUsersAnalyticsPage),
    active$: store.select(fromRoot.getUsersAnalyticsIsActive),
    loading$: store.select(fromRoot.getLoadingAnalytics)
  };

  let dispatchers: ListDispatchers = {
    setData(data) {
      store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
    },
    setLoading(data) {
      store.dispatch(new fromLoadingDispatcher.SetLoadingUserAnalytics(data))
    },
    setActive(isActive: boolean = true){
      store.dispatch(new fromUsersDispatcher.SetListActive(isActive))
    }
  };

  let listState: EntityListState = {
    selectors,
    dispatchers,
    store,
    api$
  };

  let entityList = HListFactory(listState, innerConfig);

  return {
    ...entityList
  }
};