import * as fromGroup from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import { EntityItemClient } from "../../base/item-client";
import { clientSubMixin } from "../../mixins/client-subscription";
import { itemQueryMixin } from "../../mixins/entity-query";
import { getIdQueryDataMixin } from "../../mixins/get-data";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";
import { Observable } from "rxjs/Observable";
import { entityApi } from "../../global/entity-api";
import { IClientConfig } from "../../interfaces";
import { Subscription } from "rxjs/Subscription";
import { getFirstDataMixin } from "../../mixins/get-first-data";

export class GroupsItem extends EntityItemClient {
  name = "group";
  defaultQuery = { ordering: "-created_at" };
  updateStrategy = "once";

  query$: Observable<object> = of({});
  data$ = empty();
  loading$ = of(false);

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), ...this.defaultQuery };
  }

  api$ = (id, query?) => entityApi.groups.get(id, query);

  setId(id) {
    this.store.dispatch(new fromGroupDispatcher.SetGroupId(id));
  }
  setData(data) {
    this.store.dispatch(new fromGroupDispatcher.SetGroup(data));
  }
  setLoading(data) {}
  setQuery() {}
  store;
  constructor({ store }: IClientConfig) {
    super();
    this.store = store;
    this.id$ = this.store.select(fromGroup.getGroupId);
    // this.init()
  }
}

export const GroupsItemClient = clientSubMixin(
  getIdQueryDataMixin(getFirstDataMixin(itemQueryMixin(GroupsItem)))
);
// applyMixins(GroupsItemClient, [ItemGetData, ItemQuery, ClientSub]);

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
