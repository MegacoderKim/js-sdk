import {HtUsersApi} from "./api/users";
import {HtGroupsApi} from "./api/groups";
import {HtActionsApi} from "./api/actions";

export const apiFactory = () => {
  return {
    users: new HtUsersApi(),
    groups: new HtGroupsApi(),
    actions: new HtActionsApi()
  }
};