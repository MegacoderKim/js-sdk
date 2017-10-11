import {Page, Partial} from "ht-models";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {Store} from "../../store/store";
import {AllData} from "../../interfaces";
import {HListFactory} from "../base/list-client";
import {EntityList, EntityListState, EntityTypeConfig, ListDispatchers, ListSelectors, ListState} from "../base/interfaces";
import {AddGroupsListSelector, GroupListFactory, GroupsList} from "./groups-list-interface"

export const groupsListClientFactory: GroupListFactory = (state: ListState, config: Partial<EntityTypeConfig> = {}): GroupsList => {
  let innerConfig = {
    name: 'group',
    defaultQuery: {ordering: '-created_at'},
    ...config
  };

  let {
    store,
    api$
  } = state;

  let listSelectors:  ListSelectors = {
    query$: Observable.of({}),
    data$: store.select(fromRoot.getGroupAll),
    active$: store.select(fromRoot.getGroupListActive),
    loading$: Observable.of(false),

  };

  let groupSelector: AddGroupsListSelector = {
    getRoots() {
      return  api$({has_parent: false})
    },
    getChildren(groupId) {
      return api$({parent_group_id: groupId})
    }
  };

  let dispatchers: ListDispatchers = {
    setData(data) {
      store.dispatch(new fromGroupDispatcher.SetGroupsAll(data))
    },
    setLoading(data) {
      console.log("loading", data);
    },
    setActive(isActive: boolean = true) {
      store.dispatch(new fromGroupDispatcher.SetListActive(isActive))
    }
  };

  let listState: EntityListState = {
    selectors: listSelectors,
    dispatchers,
    api$,
    store,
    firstDataEffect: (data) => dispatchers.setLoading(false)
  };

  let entityList: EntityList = HListFactory(listState, innerConfig);

  return {
    ...entityList,
    selectors: {...entityList.selectors, ...groupSelector, ...listSelectors},
    dispatchers
  }
};
