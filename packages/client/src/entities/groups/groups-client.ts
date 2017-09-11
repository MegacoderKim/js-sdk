import {EntityClient} from "../../base/entity-client";
import {HtGroupsListClient} from "./groups-list";
import {IBaseClientOptions} from "../../interfaces";
import {HtBaseApi} from "../../api/base";
import {HtGroupsApi} from "../../api/groups";
import {HtGroupsItemClient} from "./groups-item-client";
import {Observable} from "rxjs/Observable";

export class HtGroupsClient extends EntityClient{
  list: HtGroupsListClient;
  item: HtGroupsItemClient;
  api: HtBaseApi;
  constructor(req, options = {}) {
    super();
    let api = new HtGroupsApi(req);
    this.api = api;
    this.list = new HtGroupsListClient({api});
    this.item = new HtGroupsItemClient({api})
  }

  key$(id) {
    return this.api.get(id).map((group) => {
      return group['token']
    });
  }
}