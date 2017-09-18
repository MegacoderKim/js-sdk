import {HtActionsClient} from "./entities/actions/actions-client";
import {HtUsersClient} from "./entities/users/users-client";
import {HtGroupsClient} from "./entities/groups/groups-client";
import {IClientOptions} from "./interfaces";
import {StoreProvider} from "./store/index";
// import {reducer, reducers} from "./reducers/index";
import * as fromRoot from "./reducers";

import {createFeatureSelector, createSelector, MemoizedSelector} from "./store/selector";
import * as fromUsers from "./reducers/user-reducer";
import * as fromSegments from "./reducers/segments-reducer";
import * as fromQuery from "./reducers/query-reducer";

export class HtClient {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  // actions: HtActionsClient;
  users: HtUsersClient;
  // groups: HtGroupsClient;
  storeProvider = new StoreProvider(fromRoot.reducers);

  constructor(public request, options: IClientOptions = {}) {
    // this.token = this.token || HtClientConfig.token;
    this.initEntities(options);
  }

  get store() {
    return this.storeProvider.STORE_PROVIDERS;
  }
  /**
   * @param key  Add currentKey to request. Passing null will force api to use global token.
   * @returns      Comment for special return value.
   */
  setToken(key: string) {
    // this.actions.api.request.setToken(key);
    this.users.api.request.setToken(key);
    // this.groups.api.request.setToken(key);
  }

  initEntities(options: IClientOptions = {}) {
    let request = this.request;
    // this.actions =  new HtActionsClient(request, options.actionsClientOptions);
    this.users = new HtUsersClient(request, this.store, options.usersClientOptions);
    // this.groups = new HtGroupsClient(request)
  }

  clearData() {
    this.users.clearData()
  }

  /**
   * Store selectors
   */

}
