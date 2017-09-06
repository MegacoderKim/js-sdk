import {HtUsersListClient} from "./users-list-client";
import {HtUserPlacelineClient} from "./user-placeline-client";
import {HtUsersApi} from "../../api/users";
import {IItemClientOptions, IListClientOptions} from "../../interfaces";
import {Partial} from "ht-models";
import {HtUsersAnalytics} from "./users-analytics";

export class HtUsersClient {
  list: HtUsersListClient;
  analytics: HtUsersAnalytics;
  placeline: HtUserPlacelineClient;
  api;
  constructor(req, options: IUsersClientOptions = {}) {
    let api = new HtUsersApi(req);
    this.api = api;
    this.list = new HtUsersListClient({
      api,
      ...options.listOptions
    });

    this.analytics = new HtUsersAnalytics({
      api,
      ...options.analyticsOptions
    });

    this.placeline = new HtUserPlacelineClient({
      api,
      ...options.placelineOptions
    })
  }

}

export interface IUsersClientOptions {
  placelineOptions?: Partial<IItemClientOptions<HtUsersApi>>,
  listOptions?: Partial<IListClientOptions<HtUsersApi>>,
  analyticsOptions?: Partial<IListClientOptions<HtUsersApi>>
}