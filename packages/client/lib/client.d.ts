import 'rxjs/add/observable/of';
import { HtActionsClient } from "./entities/actions/actions-client";
import { HtUsersClient } from "./entities/users/users-client";
export declare class HtClient {
    actions: HtActionsClient;
    users: HtUsersClient;
    constructor(request: any);
    initEntities(request: any): void;
}
