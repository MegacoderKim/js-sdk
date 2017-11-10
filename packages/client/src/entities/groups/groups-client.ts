import {EntityClient} from "../../base/entity-client";
import {groupsListClientFactory} from "./groups-list";
import {HtBaseApi} from "../../api/base";
import {groupsItemsClientFactory} from "./groups-item-client";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";
import {GroupsItem} from "./groups-item-interface";
import {GroupsList} from "./groups-list-interface";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {Observable} from "rxjs/Observable";
import {AllData} from "../../interfaces";

// import {htClient} from "../../client";

export class HtGroupsClient extends EntityClient{
  list: GroupsList;
  item: GroupsItem;
  api: HtBaseApi;
  store: Store<fromRoot.State>;
  constructor(options = {}) {
    super();
    let api = clientApi.groups;
    this.api = api;
    this.store = store;

    this.list = groupsListClientFactory();

    this.item = groupsItemsClientFactory()

  }

  key$(id) {
    return this.api.get(id).map((group) => {
      return group['token']
    });
  }

  lookupIdKey$(lookupId): Observable<any> {
    return this.api.index({lookup_id: lookupId}).map(groupPage => {
      return groupPage && groupPage['results'] ? groupPage['results'][0]['token'] : null
    })
  }

  getChildren(groupId: string): Observable<AllData<any>> {
    return this.api.all$({parent_group_id: groupId})
  }

  getRoot() {
    return this.api.all$({has_parent: false})
  }
}