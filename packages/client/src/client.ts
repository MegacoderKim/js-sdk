import {HtActionsClient} from "./entities/actions/actions-client";
import {HtUsersClient} from "./entities/users/users-client";
import {HtGroupsClient} from "./entities/groups/groups-client";
import {IClientOptions} from "./interfaces";
import {entityApiFactory, IEntityApi} from "./entity-api";
import {HtRequest} from "./request";
import {clientApi} from "./client-api";

export class HtClient {
  // actions: HtActionsClient;
  users: HtUsersClient;
  groups: HtGroupsClient;
  constructor(token: string, options: IClientOptions = {}) {
    clientApi.setToken(token);
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

// export const htClient: IHtClient = {
//   token: '',
//   api: entityApiFactory(),
//   request: new HtRequest(),
//   setToken(token: string) {
//     this.token = token;
//     this.request.token = token;
//     // this.api.request = this.request
//   },
//   setRequest(request) {
//     request.token = request.token || this.token;
//     this.request = request
//   }
// };
//
// export interface IHtClient {
//   token: string,
//   api: IEntityApi,
//   request: HtRequest,
//   setToken(token: string): void,
//   setRequest(request: HtRequest): void
// }


