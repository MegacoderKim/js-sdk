import {EntityClient} from "../../base/entity-client";
import {groupsListClientFactory} from "./groups-list";
import {HtBaseApi} from "../../api/base";
import {HtGroupsApi} from "../../api/groups";
import {groupsItemsClientFactory} from "./groups-item-client";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";
import {EntityTypeState, ItemState, ListState} from "../base/interfaces";
import {GroupsItem} from "./groups-item-interface";
import {GroupsList} from "./groups-list-interface";
import {AllData} from "../../interfaces";
import {Observable} from "rxjs/Observable";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
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
    let entityState: EntityTypeState = {
      store,
    };

    let listState: ListState = {
      ...entityState,
      api$: (query) => this.api.index(query),
    };

    let itemState: ItemState = {
      ...entityState,
      api$: (id, query) => this.api.get(id, query),
    };

    this.list = groupsListClientFactory(
      listState,
      {updateStrategy: 'once'}
    );

    this.item = groupsItemsClientFactory(itemState, {})

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

  getChildren(groupId: string) {
    return this.api.all$({parent_group_id: groupId})
  }

  getRoot() {
    return this.api.all$({has_parent: false})
  }
}