import {HtUsersApi} from "./api/users";
import {HtGroupsApi} from "./api/groups";
import {HtActionsApi} from "./api/actions";

export const entityApiFactory = (): IEntityApi => {
  return {
    users: new HtUsersApi(),
    groups: new HtGroupsApi(),
    actions: new HtActionsApi()
  }
};

export interface IEntityApi {
  users: HtUsersApi,
  groups: HtGroupsApi,
  actions: HtActionsApi
}