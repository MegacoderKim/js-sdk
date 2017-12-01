import {EntityClient} from "../../base/entity-client";
import {GroupsListClient} from "./groups-list";
import {HtBaseApi} from "../../api/base";
import {GroupsItemClient} from "./groups-item-client";
import {Store} from "../../store/store";
import * as fromRoot from "../../reducers";
import { ApiStoreService} from "../../global/store-provider";
import {Observable} from "rxjs/Observable";
import {AllData, IDateRange} from "../../interfaces";
import {map} from "rxjs/operators";
import {dateRangeService} from "../../global/date-range";
import {entityApi} from "../../global/entity-api";
import * as fromGroups from "../../reducers/groups-reducer";

export class HtGroupsClient extends EntityClient{
  list: GroupsListClient;
  item: GroupsItemClient;
  api: HtBaseApi;
  store: Store<fromRoot.State>;
  constructor(options = {}) {
    super();
    let api = entityApi.groups;
    this.api = api;
    const store = ApiStoreService.getNewInstance();
    store.addReducer('groups', fromGroups.groupsReducer);
    this.store = store;

    this.list = new GroupsListClient({store});

    this.item = new GroupsItemClient({store})

  }

  key$(id) {
    return this.api.get(id).pipe(
      map((group) => {
        return group['token']
      })
    );
  }

  lookupIdKey$(lookupId): Observable<any> {
    return this.api.index({lookup_id: lookupId}).pipe(
      map(groupPage => {
        return groupPage && groupPage['results'] ? groupPage['results'][0]['token'] : null
      })
    )
  }

  getChildren(groupId: string): Observable<AllData<any>> {
    return this.api.all$({parent_group_id: groupId})
  }

  getRoot() {
    return this.api.all$({has_parent: false})
  }
};

export const groupsClientFactory = (options: Partial<IGroupClientConfig> = {}) => {
  let dateRange$ = options.noDateRange ? null : options.dateRange$ || dateRangeService.getInstance().data$;
  return new HtGroupsClient({dateRange$})
};

export interface IGroupClientConfig {
  dateRange$: Observable<IDateRange>,
  noDateRange: boolean
}