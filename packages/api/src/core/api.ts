import {HtRequest} from "./request";
import {HtUsersApi} from "../entities/users";
import {HtActionsApi} from "../entities/actions";
import {HtGroupsApi} from "../entities/groups";
import {HtAccountUserApi} from "../entities/account-user";

export class HtApi {
  request: HtRequest;
  users: HtUsersApi;
  actions: HtActionsApi;
  groups: HtGroupsApi;
  accountUser: HtAccountUserApi;
  constructor(request: HtRequest, token?) {
    this.request = request;
    if (token) this.request.tokenServie.token = token;
    this.users = new HtUsersApi(this.request);
    this.actions = new HtActionsApi(this.request);
    this.groups = new HtGroupsApi(this.request);
    this.accountUser = new HtAccountUserApi(this.request)
  };

  setToken(token) {
    this.request.tokenServie.token = token;
  }
}
