import 'rxjs/add/observable/of';
import {HtClientConfig, htActionsApi} from "ht-js-client";
import {HtActionsClient} from "./actions/actions-client";
import {HtUsersClient} from "./users/users-client";

export class HtClient {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  actions: HtActionsClient;
  users: HtUsersClient;

  constructor(request) {
    // this.token = this.token || HtClientConfig.token;
    this.initEntities(request)
  }

  initEntities(request) {
    this.actions =  new HtActionsClient(request);
    this.users = new HtUsersClient(request);
  }

}