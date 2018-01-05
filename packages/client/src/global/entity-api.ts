import { HtUsersApi } from "../api/users";
import { HtGroupsApi } from "../api/groups";
import { HtActionsApi } from "../api/actions";
import { HtAccountUserApi } from "../api/account-user";

export const entityApiFactory = (): IEntityApi => {
  return {
    users: new HtUsersApi(),
    groups: new HtGroupsApi(),
    actions: new HtActionsApi(),
    accounts: new HtAccountUserApi()
  };
};

export const entityApi = entityApiFactory();

export interface IEntityApi {
  users: HtUsersApi;
  groups: HtGroupsApi;
  actions: HtActionsApi;
  accounts: HtAccountUserApi;
}
