import {HtActionsClient} from "./entities/actions/actions-client";
import {HtUsersClient} from "./entities/users/users-client";
import {HtGroupsClient} from "./entities/groups/groups-client";
import {IClientOptions} from "./interfaces";
import {entityApiFactory, IEntityApi} from "./entity-api";
import {HtRequest} from "./request";
import {clientApi} from "./client-api";

export class HtClient {
  constructor(token: string, options: IClientOptions = {}) {
    clientApi.setToken(token);
  }

}


