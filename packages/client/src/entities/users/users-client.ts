import {HtUsersListClient} from "./users-list-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial} from "ht-models";

export class HtUsersClient {
  list: HtUsersListClient;
  placeline: HtUserPlacelineClient;

  constructor(req, options: IUsersClientOptions = {}) {
    let api = new HtUsersApi(req);
    this.list = new HtUsersListClient(req, options['defaultConfigQuery'], options['listConfig'])
    this.placeline = new HtUserPlacelineClient({
      api,
      ...options.placelineOptions
    })
  }

}

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions>,
  listOptions?: Partial<IListClientOptions>
}