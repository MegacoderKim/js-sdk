import { entityApi } from "../../global/entity-api";
import * as fromAccount from "../../reducers/account-reducer";
import { ApiStoreService } from "../../global/store-provider";
import { AccountUserClient } from "./account-user-client";
import { MemberShipsClient } from "./memberships-all-client";
import * as fromRoot from "../../reducers";
import * as fromAccounts from "../../dispatchers/accounts-dispatcher";

export class AccountsClient {
  api;
  store;
  accountUser;
  memberships;
  constructor() {
    this.api = entityApi.accounts;
    this.store = ApiStoreService.getInstance();
    this.store.addReducer("accounts", fromAccount.reducer);
    this.accountUser = new AccountUserClient({ store: this.store });
    this.memberships = new MemberShipsClient({ store: this.store });
  }

  setToken(token) {
    this.store.dispatch(new fromAccounts.SetKey(token));
  }
}
