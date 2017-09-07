import {HtActionsClient, IActionsClientOptions} from "./entities/actions/actions-client";
import {HtUsersClient, IUsersClientOptions} from "./entities/users/users-client";

export class HtClient {
  // private token: string = 'sk_55fc65eb64c0b10300c54ff79ea3f6ef22981793';
  actions: HtActionsClient;
  users: HtUsersClient;

  constructor(public request, options: IClientOptions = {}) {
    // this.token = this.token || HtClientConfig.token;
    this.initEntities(options)
  }

  initEntities(options: IClientOptions = {}) {
    let request = this.request;
    this.actions =  new HtActionsClient(request, options.actionsClientOptions);
    this.users = new HtUsersClient(request, options.usersClientOptions);
  }

}

export interface IClientOptions {
  actionsClientOptions?: IActionsClientOptions,
  usersClientOptions?: IUsersClientOptions
}