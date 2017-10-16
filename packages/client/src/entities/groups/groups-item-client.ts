import {Observable} from "rxjs/Observable";
import * as fromGroup from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {Store} from "../../store/store";
import {HItemFactory} from "../base/item-client";
import {GroupsItem, GroupsItemFactory} from "./groups-item-interface";

import {
  EntityItemDispatchers,
  EntityItemFactory, EntityItemSelectors, EntityItemState, EntityTypeConfig, ItemDispatchers, GenItemSelectors,
  ItemState
} from "../base/interfaces";

export const groupsItemsClientFactory: GroupsItemFactory = (state: ItemState, config: Partial<EntityTypeConfig> = {}): GroupsItem => {
  let innerConfig = {
    name: 'group',
    defaultQuery: {ordering: '-created_at'},
    ...config
  };

  let {
    api$,
    store
  } = state;

  let itemSelector: EntityItemSelectors = {
    id$: store.select(fromGroup.getGroupId),
    query$: Observable.of({}),
    data$: Observable.empty(),
    loading$: Observable.of(false),
  };

  let dispatchers: EntityItemDispatchers = {
    setId(id) {
      store.dispatch(new fromGroupDispatcher.SetGroupId(id))
    },
    setData(data) {
      store.dispatch(new fromGroupDispatcher.SetGroup(data))
    },
    setLoading(data) {

    }
  };

  let itemState: EntityItemState = {
    ...state,
    selectors: itemSelector,
    dispatchers,
    firstDataEffect(data) {
      dispatchers.setLoading(false)
    }
  };

  let entityItem = HItemFactory(itemState, innerConfig);

  return {
    ...entityItem,
    ...dispatchers,
    ...itemSelector,
    ...entityItem.selectors
  }
  // return HItemFactory(api$, store, innerConfig)
};