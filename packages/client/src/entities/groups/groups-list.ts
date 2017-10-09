import {IGroup} from "ht-models";
import {HtBaseApi} from "../../api/base";
import {HtListClient} from "../../base/list-client";
import {Page, Partial} from "ht-models";
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {Store} from "../../store/store";
import {AllData} from "../../interfaces";
import {
  HEntityState, HEntityType, HEntity, ISelectors, IDispatchers, HList,
  HGroupsListFunctions, HGroupListMethods, HGroupList
} from "../base/interfaces";
import {HListFactory} from "../base/list-client";

export class HtGroupsListClient extends HtListClient<Page<IGroup>> {

  name = "group List";

  // api$(query) {
  //   return this.api.index<Page<IGroup>>(query)
  // }

  getDataQuery$() {
    let dataQuery$ = this.query$.map((query) => {
      return {...this.getDefaultQuery(), ...query}
    });
    return dataQuery$
  }

  get isActive$() {
    return this.store.select(fromRoot.getGroupListActive)
  }

  get loading$() {
    return Observable.empty()
  }

  get query$() {
    return Observable.of({})
  }

  getDefaultQuery() {
    return { ...super.getDefaultQuery(), ordering: "-created_at", page_size: 50}
  }

  get data$() {
    return this.store.select(fromRoot.getGroupAll)
  }

  get dataArray$() {
    return this.data$.map((dataPage) => {
      return dataPage ? dataPage['results'] : null
    })
  }

  setData(data) {
    return this.store.dispatch(new fromGroupDispatcher.SetGroupsAll(data))
  }

  setActive(isActive?) {
    return this.store.dispatch(new fromGroupDispatcher.SetListActive(isActive))
  }


}

export const groupsListClientFactory = (api$, store, overrideEntityState: HEntityState, config: Partial<HEntityType> = {}): HGroupList => {
  let innerConfig = {
    name: 'group',
    defaultQuery: {ordering: '-created_at'},
    ...config
  };
  let selectors: ISelectors = {
    query$: Observable.of({}),
    data$: store.select(fromRoot.getGroupAll),
    active$: store.select(fromRoot.getGroupListActive)
  };
  let dispatchers: IDispatchers = {
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

  let methods: HGroupListMethods = {
    getRoots() {
      return  api$({has_parent: false})
    },
    getChildren(groupId) {
      return api$({parent_group_id: groupId})
    }
  };
  let groupsFunctions: HGroupsListFunctions = {
    dispatchers,
    selectors,
    methods
  };
  return <HGroupList>(HListFactory(api$, store, groupsFunctions, overrideEntityState, innerConfig))
};
