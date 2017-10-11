import {ItemClient} from "../../base/item-client";
import {HtGroupsApi} from "../../api/groups";
import {IGroup } from "ht-models"
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

export class HtGroupsItemClient extends ItemClient<IGroup> {
  name = "group item";

  getData$({id, query}): Observable<IGroup> {
    return id ?
      this.api$(id, query)
        .do(() => {
          this.updateLoadingData(false)
        }) : Observable.of(null)

  }

  // api$(id, query = {}): Observable<IGroup> {
  //   return this.api.get<IGroup>(id, {...this.defaultQuery, ...query})
  // }

  get query$() {
    return Observable.of({})
  }

  get id$() {
    return this.store.select(fromGroup.getGroupId)
  }

  get loading$() {
    return this.id$
  }

  setId(id) {
    this.store.dispatch(new fromGroupDispatcher.SetGroupId(id))
  }

  setData(data) {
    this.store.dispatch(new fromGroupDispatcher.SetGroup(data))
  }
}

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
    selectors: itemSelector,
    dispatchers,
    store,
    api$
  };

  let entityItem = HItemFactory(itemState, innerConfig);

  return {
    ...entityItem,
    dispatchers,
    selectors: {...itemSelector, ...entityItem.selectors}
  }
  // return HItemFactory(api$, store, innerConfig)
};