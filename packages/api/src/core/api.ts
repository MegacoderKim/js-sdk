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
    constructor(request) {
        this.request = request;
        this.users = new HtUsersApi(request);
        this.actions = new HtActionsApi(request);
        this.groups = new HtGroupsApi(request);
        this.accountUser = new HtAccountUserApi(request)
    }
}
