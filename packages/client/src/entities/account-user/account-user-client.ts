import {entityApi} from "../../global/entity-api";
import * as fromAccount from "../../reducers/account-reducer"
import {ApiStoreService} from "../../global/store-provider";
import {getIdPageDataMixin, getItemDataMixin} from "../../mixins/get-data";
import {clientSubMixin} from "../../mixins/client-subscription";
import {itemQueryMixin, listQueryMixin} from "../../mixins/entity-query";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as fromAccounts from "../../dispatchers/accounts-dispatcher"
import {IPageClientConfig} from "../../interfaces";

export class AccountUser {
  query$: Observable<object> = of({});
  id$;
  updateStrategy = 'once';
  pollDuration = 10000;
  store;
  data$;
  loading$;

  constructor({dateRangeQuery$, store}: IPageClientConfig) {
    this.store = store;
    // this.active$ = this.store.select(fromRoot.getUsersAnalyticsIsActive);
    this.data$ = this.store.select(fromRoot.getAccountUser);
    this.id$ = this.store.select(fromRoot.getAccountUserId);
    this.loading$ = this.store.select(fromRoot.getAccountCurrentKey);
    // this.init()
  }

  getDefaultQuery() {
    return {}
  }

  setId(id) {
    this.store.dispatch(new fromAccounts.SetUserId(id))
  }

  setLoading(loading) {

  }

  setData(data) {
    this.store.dispatch(new fromAccounts.SetAccountUser(data))
  }

  api$ = (id, query) => entityApi.accounts.get(id, query);
}

export const AccountUserClient = clientSubMixin(getItemDataMixin(itemQueryMixin(AccountUser)))
