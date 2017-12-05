import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as fromGroupDispatcher from "../../dispatchers/groups-dispatcher";
import {clientSubMixin} from "../../mixins/client-subscription";
import {listQueryMixin} from "../../mixins/entity-query";
import {getPageDataMixin} from "../../mixins/get-data";
import {of} from "rxjs/observable/of";
import {PageResults$} from "ht-data";
import {Page, IGroup} from "ht-models";
import {entityApi} from "../../global/entity-api";
import {IClientConfig} from "../../interfaces";
import {Subscription} from "rxjs/Subscription";
import {getFirstDataMixin} from "../../mixins/get-first-data";

export class GroupsList {
  name = 'group';
  defaultQuery = {ordering: '-created_at'};
  query$ = of({});
  updateStrategy = 'once';
  pollDuration = 10000;
  // data$ = store.select(fromRoot.getGroupAll);
  // active$ = store.select(fromRoot.getGroupListActive);
  data$;
  active$;
  loading$ = of(false);
  dataArray$;
  api$ = (query) => entityApi.groups.index<Page<IGroup>>(query);
  store;
  setData(data) {
    this.store.dispatch(new fromGroupDispatcher.SetGroupsAll(data))
  };
  setLoading(data) {
    console.log("loading", data);
  };
  setActive(isActive: boolean = true) {
    this.store.dispatch(new fromGroupDispatcher.SetListActive(isActive))
  };
  setQuery() {

  }

  firstDataEffect(data) {
    this.setLoading(false);
  }

  getRoots(): Observable<Page<IGroup>> {
    return  this.api$({has_parent: false})
  };
  getChildren(groupId): Observable<Page<IGroup>> {
    return this.api$({parent_group_id: groupId})
  }

  getDefaultQuery() {
    return {page_size: 10, ...this.defaultQuery}
  }

  constructor({store}: IClientConfig) {
    this.store = store;
    this.data$ = this.store.select(fromRoot.getGroupAll);
    this.active$ = store.select(fromRoot.getGroupListActive);
    this.dataArray$ = this.data$.let(PageResults$);
  }

};

export const GroupsListClient = clientSubMixin(getPageDataMixin(getFirstDataMixin(listQueryMixin(GroupsList))));


// applyMixins(GroupsListClient, [ListGetData, ListQuery, ClientSub]);

