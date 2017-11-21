import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {EntityItemClient} from "../../base/item-client";
import {ClientSub} from "../base/client-factory";
import {ListQuery} from "../helpers/api-query-factory";
import {ListGetData} from "../helpers/get-data-factory";
import {applyMixins} from "../helpers/mix";
import {of} from "rxjs/observable/of";

export class GroupsListClient extends EntityItemClient {
  name = 'group';
  defaultQuery = {ordering: '-created_at'};
  query$ = of({});
  data$ = store.select(fromRoot.getGroupAll);
  active$ = store.select(fromRoot.getGroupListActive);
  loading$ = of(false);

  api$ = (query) => clientApi.groups.index(query);

  setData(data) {
    store.dispatch(new fromGroupDispatcher.SetGroupsAll(data))
  };
  setLoading(data) {
    console.log("loading", data);
  };
  setActive(isActive: boolean = true) {
    store.dispatch(new fromGroupDispatcher.SetListActive(isActive))
  };
  setQuery() {

  }

  getRoots() {
    return  this.api$({has_parent: false})
  };
  getChildren(groupId) {
    return this.api$({parent_group_id: groupId})
  }

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ...this.defaultQuery}
  }

  constructor() {
    super();
    this.init()
  }

};

applyMixins(GroupsListClient, [ListGetData, ListQuery, ClientSub]);
// export const groupsListClientFactory = (config = {}): GroupsList => {
//   let innerConfig = {
//     name: 'group',
//     defaultQuery: {ordering: '-created_at'},
//     ...config
//   };
//
//   let listSelectors:  ListSelectors = {
//     query$: Observable.of({}),
//     data$: store.select(fromRoot.getGroupAll),
//     active$: store.select(fromRoot.getGroupListActive),
//     loading$: Observable.of(false),
//
//   };
//
//   let api$ = (query) => clientApi.groups.index(query);
//
//   let groupSelector: AddGroupsListSelector = {
//     getRoots() {
//       return  api$({has_parent: false})
//     },
//     getChildren(groupId) {
//       return api$({parent_group_id: groupId})
//     }
//   };
//
//   let dispatchers: ListDispatchers = {
//     setData(data) {
//       store.dispatch(new fromGroupDispatcher.SetGroupsAll(data))
//     },
//     setLoading(data) {
//       console.log("loading", data);
//     },
//     setActive(isActive: boolean = true) {
//       store.dispatch(new fromGroupDispatcher.SetListActive(isActive))
//     },
//     setQuery() {
//
//     }
//   };
//
//   let state = {
//     api$,
//     selectors: {
//       ...listSelectors,
//       ...groupSelector
//     },
//     dispatchers: {
//       ...dispatchers
//     }
//   };
//
//   let groupIndex = entityClientFactory(state, innerConfig, 'list');
//
//   groupIndex.init();
//
//   return groupIndex as GroupsList;
//
// };
