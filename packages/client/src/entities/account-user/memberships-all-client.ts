import {itemQueryMixin, listQueryMixin} from "../../mixins/entity-query";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {clientSubMixin} from "../../mixins/client-subscription";
import {getIdQueryDataMixin, getPageDataMixin} from "../../mixins/get-data";
import {entityApi} from "../../global/entity-api";
import {Subscription} from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as fromAccount from "../../dispatchers/accounts-dispatcher";
import {IPageClientConfig} from "../../interfaces";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {getFirstDataMixin} from "../../mixins/get-first-data";

export class MembershipsAll {
  query$: Observable<object> = of({});
  updateStrategy = 'once';
  pollDuration = 10000;
  active$ = of(true);
  api$ = (id, query) => entityApi.accounts.membershipsAll(id, query, {});
  store;
  data$;
  id$;
  loading$: BehaviorSubject<string | boolean> = new BehaviorSubject(false);
  constructor({dateRangeQuery$, store}: IPageClientConfig) {
    this.store = store;
    // this.active$ = this.store.select(fromRoot.getUsersAnalyticsIsActive);
    this.data$ = this.store.select(fromRoot.getAccountMembershipsAll);
    this.id$ = this.store.select(fromRoot.getAccountUserId);
    // this.loading$ = this.store.select(fromRoot.getAccountCurrentKey);
    // this.init()
  }

  firstDataEffect() {
    this.setLoading()
  }

  getDefaultQuery() {
    return {page_size: 100}
  }

  setLoading(loading: string | boolean = true) {
    this.loading$.next(loading)
  }

  setData(data) {
    this.store.dispatch(new fromAccount.SetMembershipsAll(data))
  }
}

export const MemberShipsClient = clientSubMixin(getIdQueryDataMixin(getFirstDataMixin(itemQueryMixin(MembershipsAll))));
