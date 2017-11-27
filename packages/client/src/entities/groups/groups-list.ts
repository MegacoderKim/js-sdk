import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {store} from "../../global/store-provider";
import {EntityItemClient} from "../../base/item-client";
import {ClientSub} from "../../mixins/client-subscription";
import {ListQuery} from "../../mixins/entity-query";
import {ListGetData} from "../../mixins/get-data";
import {applyMixins} from "../../helpers/mix";
import {of} from "rxjs/observable/of";
import {EntityListClient} from "../../base/list-client";
import {PageResults$} from "ht-data";
import {Page, IGroup} from "ht-models";
import {entityApi} from "../../global/entity-api";

export class GroupsListClient extends EntityListClient {
  name = 'group';
  defaultQuery = {ordering: '-created_at'};
  query$ = of({});
  data$ = store.select(fromRoot.getGroupAll);
  active$ = store.select(fromRoot.getGroupListActive);
  loading$ = of(false);
  dataArray$ = this.data$.let(PageResults$);
  api$ = (query) => entityApi.groups.index<Page<IGroup>>(query);

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

  getRoots(): Observable<Page<IGroup>> {
    return  this.api$({has_parent: false})
  };
  getChildren(groupId): Observable<Page<IGroup>> {
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
