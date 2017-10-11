import {HtListClient} from "../../base/list-client";
import {IUserAnalyticsPage, IUserPage, IUserAnalytics, IUser} from "ht-models";
import {HtUsersApi} from "../../api/users";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import {Store} from "../../store/store";
import * as fromUsersDispatcher from "../../dispatchers/user-dispatcher";
import {HListFactory} from "../base/list-client";
import * as fromLoadingDispatcher from "../../dispatchers/loading-dispatcher";
import {UsersAnalytics, UsersAnalyticsFactory} from "./users-analytics-interfaces";
import {EntityListState, EntityTypeConfig, ListDispatchers, ListSelectors, ListState} from "../base/interfaces";

export class HtUsersAnalytics extends HtListClient<IUserAnalyticsPage | IUserPage> {
  //todo IUserPage added as hack to fix allMarkers$ in client
  name = "analytics users";
  toUpdate = true;

  get isActive$(): Observable<boolean> {
    return this.store.select(fromRoot.getUsersAnalyticsIsActive)
  }

  get query$() {
    return this.store.select(fromRoot.getQueryUserQuery)
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

  // api$(query) {
  //   return this.api.analytics(query)
  // }

  setData(data) {
    this.store.dispatch(new fromUsersDispatcher.SetUsersAnalyticsPage(data))
  }
}

export const UsersAnalyticsClientFactory: UsersAnalyticsFactory = (state: ListState, config: Partial<EntityTypeConfig> = {}): UsersAnalytics => {
  let innerConfig = {
    name: 'users analytics',
    updateStrategy: 'update',
    ...config,
    defaultQuery: {ordering: '-last_heartbeat_at', ...config.defaultQuery},
  };

  let {api$, store, dateRangeQuery$} = state;

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

  let entityListState: EntityListState = {
      ...state,
    selectors,
    dispatchers,
    firstDataEffect: (data) => {
      dispatchers.setLoading(false)
    }
  };

  let entityList = HListFactory(entityListState, innerConfig);

  return {
    ...entityList,
    dispatchers,
    selectors: {...selectors, ...entityList.selectors}
  }
};