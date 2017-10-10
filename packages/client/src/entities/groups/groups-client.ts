import {EntityClient} from "../../base/entity-client";
import {groupsListClientFactory, HtGroupsListClient} from "./groups-list";
import {HtBaseApi} from "../../api/base";
import {HtGroupsApi} from "../../api/groups";
import {groupsItemsClientFactory, HtGroupsItemClient} from "./groups-item-client";
import {Observable} from "rxjs/Observable";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";
import {AllData} from "../../interfaces";
import {EntityListState, EntityTypeState, ItemState, ListState} from "../base/interfaces";
import { GroupsItem } from "./groups-item-interface";
import { GroupsList } from "./groups-list-interface";

export class HtGroupsClient extends EntityClient{
  list: GroupsList;
  item: GroupsItem;
  api: HtBaseApi;
  constructor(req, private store: Store<fromRoot.State>, options = {}) {
    super();
    let api = new HtGroupsApi(req);
    this.api = api;

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