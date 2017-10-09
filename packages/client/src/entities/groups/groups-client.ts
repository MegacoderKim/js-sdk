import {EntityClient} from "../../base/entity-client";
import {groupsListClientFactory, HtGroupsListClient} from "./groups-list";
import {HtBaseApi} from "../../api/base";
import {HtGroupsApi} from "../../api/groups";
import {groupsItemsClientFactory, HtGroupsItemClient} from "./groups-item-client";
import {Observable} from "rxjs/Observable";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";
import {AllData} from "../../interfaces";
import {HEntityState, HEntity, HList} from "../base/interfaces";
import { HGroupList } from "./groups-interfaces"

export class HtGroupsClient extends EntityClient{
  list: HGroupList;
  item: HEntity;
  api: HtBaseApi;
  constructor(req, private store: Store<fromRoot.State>, options = {}) {
    super();
    let api = new HtGroupsApi(req);
    this.api = api;
    let entityState: HEntityState = {
      dateRangeParam: 'created_at',
      // dateRangeQuery$: Observable.of({start: "", end: ''})
    };
    this.list = groupsListClientFactory(
      (query) => this.api.index(query),
      store,
      entityState,
      {updateStrategy: 'once'}
    );
    // this.list = new HtGroupsListClient({
    //   api$: this.api.index,
    //   store,
    //   loadingDispatcher: (data) => {}
    // });
    let getApi$ = (id, query) => this.api.get(id, query);
    // this.item = groupsItemsClientFactory(getApi$, store)

    // this.item = new HtGroupsItemClient({
    //   api$: this.api.get,
    //   store,
    //   loadingDispatcher: (data) => {}
    // })
  }

  key$(id) {
    return this.api.get(id).map((group) => {
      return group['token']
    });
  }

  lookupIdKey$(lookupId) {
    return this.api.index({lookup_id: lookupId}).map(groupPage => {
      return groupPage && groupPage['results'] ? groupPage['results'][0]['token'] : null
    })
  }

  getChildren(groupId: string) {
    return this.api.all$({parent_group_id: groupId})
  }

  getRoot() {
    return this.api.all$({has_parent: false})
  }
}