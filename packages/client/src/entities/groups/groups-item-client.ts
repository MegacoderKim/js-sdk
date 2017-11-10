import {Observable} from "rxjs/Observable";
import * as fromGroup from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {GroupsItem} from "./groups-item-interface";

import {EntityItemDispatchers, EntityItemSelectors} from "../base/interfaces";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {entityClientFactory} from "../base/entity-factory";

export const groupsItemsClientFactory = (config = {}): GroupsItem => {
  let innerConfig = {
    name: 'group',
    defaultQuery: {ordering: '-created_at'},
    updateStrategy: 'once',
    ...config
  };

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

    },
    setQuery() {

    }

  };

  const state = {
    api$: (id, query?) => clientApi.groups.get(id, query),
    dispatchers,
    selectors: itemSelector
  };

  let groupsIndex = entityClientFactory(state, innerConfig, 'item');
  groupsIndex.init();
  return groupsIndex as GroupsItem;

};