import {EntityClient} from "../../base/entity-client";
import {HtGroupsListClient} from "./groups-list";
import {IBaseClientOptions} from "../../interfaces";
import {HtBaseApi} from "../../api/base";
import {HtGroupsApi} from "../../api/groups";
import {HtGroupsItemClient} from "./groups-item-client";
import {Observable} from "rxjs/Observable";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";

export class HtGroupsClient extends EntityClient{
  list: HtGroupsListClient;
  item: HtGroupsItemClient;
  api: HtBaseApi;
  constructor(req, private store: Store<fromRoot.State>, options = {}) {
    super();
    let api = new HtGroupsApi(req);
    this.api = api;
    this.list = new HtGroupsListClient({
      api,
      store,
      loadingDispatcher: (data) => {}
    });
    this.item = new HtGroupsItemClient({
      api,
      store,
      loadingDispatcher: (data) => {}
    })
  }

  key$(id) {
    return this.api.get(id).map((group) => {
      return group['token']
    });
  }

  lookupIdKey$(lookupId) {
    return this.api.index({lookup_id: lookupId}).map(groupPage => {
      return groupPage && groupPage['results'] ? groupPage['results'][0]['token'] : null
    })
  }
}