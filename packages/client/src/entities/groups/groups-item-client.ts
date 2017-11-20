import {Observable} from "rxjs/Observable";
import * as fromGroup from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {store} from "../../store-provider";
import {clientApi} from "../../client-api";
import {EntityItemClient} from "../../base/item-client";
import {applyMixins} from "../helpers/mix";
import {ClientSub} from "../base/client-factory";
import {ItemQuery} from "../helpers/api-query-factory";
import {ItemGetData} from "../helpers/get-data-factory";

export class GroupsItemClient extends EntityItemClient {
  name = 'group';
  defaultQuery = {ordering: '-created_at'};
  updateStrategy = 'once';
  id$ = store.select(fromGroup.getGroupId);
  query$ = Observable.of({});
  data$ = Observable.empty();
  loading$ = Observable.of(false);

  getDefaultQuery() {
    return {...super.getDefaultQuery(), ...this.defaultQuery}
  }

  api$ = (id, query?) => clientApi.groups.get(id, query);

  setId(id) {
    store.dispatch(new fromGroupDispatcher.SetGroupId(id))
  };
  setData(data) {
    store.dispatch(new fromGroupDispatcher.SetGroup(data))
  };
  setLoading(data) {

  };
  setQuery() {

  }

  constructor() {
    super();
    this.init()
  }
};

applyMixins(GroupsItemClient, [ItemGetData, ItemQuery, ClientSub]);

// export const groupsItemsClientFactory = (config = {}): GroupsItem => {
//   let innerConfig = {
//     name: 'group',
//     defaultQuery: {ordering: '-created_at'},
//     updateStrategy: 'once',
//     ...config
//   };
//
//   let itemSelector: EntityItemSelectors = {
//     id$: store.select(fromGroup.getGroupId),
//     query$: Observable.of({}),
//     data$: Observable.empty(),
//     loading$: Observable.of(false),
//   };
//
//   let dispatchers: EntityItemDispatchers = {
//     setId(id) {
//       store.dispatch(new fromGroupDispatcher.SetGroupId(id))
//     },
//     setData(data) {
//       store.dispatch(new fromGroupDispatcher.SetGroup(data))
//     },
//     setLoading(data) {
//
//     },
//     setQuery() {
//
//     }
//
//   };
//
//   const state = {
//     api$: (id, query?) => clientApi.groups.get(id, query),
//     dispatchers,
//     selectors: itemSelector
//   };
//
//   let groupsIndex = entityClientFactory(state, innerConfig, 'item');
//   groupsIndex.init();
//   return groupsIndex as GroupsItem;
//
// };