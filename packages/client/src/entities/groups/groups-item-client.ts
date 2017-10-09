import {ItemClient} from "../../base/item-client";
import {HtGroupsApi} from "../../api/groups";
import {IGroup } from "ht-models"
import {Observable} from "rxjs/Observable";
import * as fromGroup from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {Store} from "../../store/store";
import {HEntity} from "../base/interfaces";
import {HItemFactory} from "../base/item-client";

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

export const groupsItemsClientFactory = (api$, store, config = {}): HEntity => {
  let innerConfig = {
    name: 'group',
    defaultQuery: {ordering: '-created_at'},
    ...config
  };
  return HItemFactory(api$, store, innerConfig)
}