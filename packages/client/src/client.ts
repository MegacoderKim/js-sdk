import {HtActionsClient} from "./entities/actions/actions-client";
import {HtUsersClient} from "./entities/users/users-client";
import {HtGroupsClient} from "./entities/groups/groups-client";
import {IClientOptions} from "./interfaces";
import {HtClientConfig} from "./config";

export class HtClient {
  // actions: HtActionsClient;
  users: HtUsersClient;
  groups: HtGroupsClient;
  constructor(public request, options: IClientOptions = {}) {
    HtClientConfig.setRequest(request);
    this.initEntities(options);
  }

  initEntities(options: IClientOptions = {}) {

    // this.actions =  new HtActionsClient(request, options.actionsClientOptions);
    this.users = new HtUsersClient(options.usersClientOptions);
    this.groups = new HtGroupsClient()
  }

  clearData() {
    this.users.clearData()
  }

  /**
   * Store selectors
   */

}
