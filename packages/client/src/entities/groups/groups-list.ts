import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {ListDispatchers, ListSelectors} from "../base/interfaces";
import {AddGroupsListSelector, GroupsList} from "./groups-list-interface"
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {entityClientFactory} from "../base/entity-factory";

export const groupsListClientFactory = (config = {}): GroupsList => {
  let innerConfig = {
    name: 'group',
    defaultQuery: {ordering: '-created_at'},
    ...config
  };

  let listSelectors:  ListSelectors = {
    query$: Observable.of({}),
    data$: store.select(fromRoot.getGroupAll),
    active$: store.select(fromRoot.getGroupListActive),
    loading$: Observable.of(false),

  };

  let api$ = (query) => clientApi.groups.index(query);

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
    },
    setQuery() {

    }
  };

  let state = {
    api$,
    selectors: {
      ...listSelectors,
      ...groupSelector
    },
    dispatchers: {
      ...dispatchers
    }
  };

  let groupIndex = entityClientFactory(state, innerConfig, 'list');

  groupIndex.init();

  return groupIndex as GroupsList;

  // let listState = {
  //     ...listSelectors,
  //     ...dispatchers,
  //   api$,
  //   store,
  //   firstDataEffect: (data) => dispatchers.setLoading(false)
  // };
  //
  // let entityList: EntityList = HListFactory(listState, innerConfig);
  //
  // return {
  //   ...entityList,
  //   ...entityList.selectors,
  //   ...groupSelector,
  //   ...listSelectors,
  //   ...dispatchers
  // }
};
