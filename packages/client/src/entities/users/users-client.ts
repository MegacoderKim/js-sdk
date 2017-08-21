import {HtUsersListClient} from "./users-list-client";

export class HtUsersClient {
  list: HtUsersListClient;

  constructor(req, options = {}) {
    this.list = new HtUsersListClient(req, options['defaultConfigQuery'], options['listConfig'])
  }
}