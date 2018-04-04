import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {
  IAccount, IMember, ISubAccount, PartialAccount, IMembership, IAccountUser, Partial, Page,
  IWebhook
} from "ht-models";
import {GetSecretToken} from "../../utils/secret-token";
import {config} from "../config";
import {StorageService} from "../core/local-storage.service";
import {Store} from "@ngrx/store";
import * as fromRooot from "../reducers";
import * as fromAccountUser from "../actions/account-user";
import * as _ from "underscore";
import {
  getAccountFromAccountUserId, isCurrentAccount, IsCurrentMember,
  UpdateSubAccountOfAccount
} from "../../utils/account-user-helper";
import {HtQuerySerialize} from "../../utils/query-serializer";
import {MembershipsService} from "./memberships.service";
import {HttpClient} from "@angular/common/http";
import {IInvoices} from "../../models/invoices";
import * as Cookies from "js-cookie"

import {merge} from "rxjs/observable/merge";
import {environment} from '../../environments/environment';

@Injectable()
export class AccountUsersService {

  constructor(
      private http: HttpClient,
      private store: Store<fromRooot.State>,
      private storage: StorageService,
      private membershipsService: MembershipsService
  ) {
    if(config.isDemo) this.logout(false);
    // this.membershipsService.getMembershipsState().subscribe(data => {
    //   console.log("membershups", data);
    // })
  }

  _window() : any {
  // return the global native browser window object
    return window;
  }

  setUser(user: IAccountUser, cb, accountId?) {
    this.setNewUser(user.is_new_user);
    this.setStaffUser(user.is_staff);
    // this.store.dispatch(new fromAccountUser.SetAccountUserAction(user));
    this.setCookiesAccountUser(user, accountId);
    let window: any = this._window();
    if(window.Raven && user) {
      window.Raven.setUserContext({
        email: user.email,
        id: user.id
      })
    }
    this.storage.setUser(user, cb);
  }

  updateUser(user: Partial<IAccountUser>, item: string) {
    // console.log("data", user, item);
    this.store.dispatch(new fromAccountUser.UpdateAccountUserAction({data: user, item: item}))
  }

  getUser(): Observable<IAccountUser> {
    return this.store.select(fromRooot.getAccountUserCurrent).do((accountUser => {
      if(accountUser) this.storage.setUser(accountUser)
    }))
  }

  getAccount(): Observable<IAccount> {
    return this.store.select(fromRooot.getCurrentAccount)
      .filter((data) => !!data);

  }

  updateAccountWithoutPatch(account: IAccount) {
    this.store.dispatch(new fromAccountUser.SetAccountAction(account))
  }

  getSubAccount(type: string = config.tokenType): Observable<ISubAccount> {
    return this.getAccount().filter(data => !!data).map((account: IAccount) => {
      return _.find(account.sub_accounts, (subAccount: ISubAccount) => {
        return subAccount.type == type;
      })
    })
  }

  updateAccountUser(accountUser: IAccountUser) {
    this.store.dispatch(new fromAccountUser.SetAccountUserAction(accountUser))
  }

  updateAccount(account: PartialAccount, item: string) {
    //done
    this.store.dispatch(new fromAccountUser.UpdateAccountAction({data: account, item: item}))
  }

  updateSubAccount(subAccount: Partial<ISubAccount>, item: string) {
    this.store.dispatch(new fromAccountUser.UpdateSubAccountAction({data: subAccount, item: item}))
  }

  login(user, options = {}): Observable<IAccountUser> {
    return this.http.post<IAccountUser>('app/login/', user, options);
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.of(!!config.token)
  }

  addCard(obj) {
    return this.http.post('app/cards/', obj)
  }

  setTokenType(type: 'production' | 'test') {
    if(config.tokenType != type) {
      this.getAccount().subscribe((account: IAccount) => {
        let token = GetSecretToken(account, type);
        this.setCookies(token, config.userId, type);
        this.refreshPage();
      });
    }
  }

  addAccountUser(email: string, role: string, groupId?: string): Observable<IMember> {
    return Observable.zip(
        this.getAccount().take(1),
        this.getUser().take(1)
    ).flatMap(([account, accountUser]: [IAccount, IAccountUser]) => {
      let obj: {email: string, role: string, invited_by?: string, group_id?: string} = {email, role, invited_by: accountUser.email};
      if(groupId) obj = {...obj, group_id: groupId};
      return this.http.post<IMember>(`app/accounts/${account.id}/add_account_user/`, obj)
    })
  }

  changePassword(id: string, accountUser) {
    let headers = {
      'Authorization': 'token ' + config.adminToken,
      'Content-Type': 'application/json'
    };
    return this.http.post(`app/account_users/${id}/change_password/`, JSON.stringify(accountUser), {headers})
  }

  private setCookiesAccountUser(accountUser: IAccountUser, accountId?) {
    let account: IAccount = accountId ? getAccountFromAccountUserId(accountUser, accountId) : accountUser.default_account;
    let token = GetSecretToken(account, config.tokenType);
    let adminToken = GetSecretToken(accountUser.default_account, config.tokenType);
    this.setStaffUser(accountUser.is_staff);
    this.setTimezone(account.timezone);
    this.setCookies(token, accountUser.id, config.tokenType, adminToken);
  }

  private setAccountCookie(account: IAccount, accountUser?: IAccountUser) {
    let token = GetSecretToken(account, config.tokenType);
    let userId = Cookies.get('userId');
    this.setCookies(token, userId, config.tokenType);
  }

  private setCookies(token, userId, tokenType, adminToken?) {
    adminToken = adminToken || Cookies.get(`${environment.tokenName}-admin`);
    this.setCookie(environment.tokenName, token);
    this.setCookie('userId', userId);
    this.setCookie('tokenType', tokenType);
    if(adminToken) this.setCookie(`${environment.tokenName}-admin`, adminToken);
  }

  logout(toRedirect: boolean = true) {
    console.log("logout");
    if(!config.isWidget) {
      this.clearCookies();
      this.storage.clearUser(() => {
        if(toRedirect) location.href = '/';
      });
    }
  }

  private clearCookies() {
    Cookies.remove(environment.tokenName, {domain: environment.domain});
    Cookies.remove(`${environment.tokenName}-admin`, {domain: environment.domain});
    Cookies.remove('ht-readonly-token', {domain: environment.domain});
    Cookies.remove('userId', {domain: environment.domain});
    Cookies.remove('tokenType', {domain: environment.domain});
    Cookies.remove('isDemo', {domain: environment.domain})
  }

  checkAccountUser() {
    this.storage.getUser().subscribe((accountUser: IAccountUser) => {
      if (config.isDemo) return false;
      if (config.userId && config.token && accountUser && accountUser.id == config.userId) {
        if (accountUser) {
          this.store.dispatch(new fromAccountUser.SetAccountUserAction(accountUser))
        }
        this.store.dispatch(new fromAccountUser.GetAccountUserAction(config.userId));
      } else {
        this.logout()
      }
    });
    this.storage.getMemberships().filter(data => !config.isDemo).switchMap((memberships) => {
      let allMembers$ = this.membershipsService.all();
      if(memberships) {
        // this.store.dispatch(new fromAccountUser.UpdateMembershipsAction(memberships));
        return merge(allMembers$, Observable.of(memberships))
      } else {
        return this.membershipsService.all()
      }
    }).subscribe((data: IMembership[]) => {
      this.membershipsService.setMemberships(data)
    })
  };


  hydrateAccountUser() {
    let options = this.getAdminReqOpt();
    this.http.get<IAccountUser>(`app/account_users/${config.userId}/`, options)
      .subscribe((accountUser) => {
      this.store.dispatch(new fromAccountUser.SetAccountUserAction(accountUser))
    })
  }

  getAccountDataFromServer(accountId) {
    let uri = `app/accounts/${accountId}/`;
    let options = this.getAdminReqOpt();
    return this.http.get(uri, options)
  }

  setAccount(account: IAccount, accountUser?:IAccountUser) {
    this.setAccountCookie(account, accountUser);
    this.refreshPage()
  }

  setNewUser(isNew: boolean) {
    this.setCookie('new-user', isNew)
  }

  setStaffUser(isStaff: boolean) {
    this.setCookie('staff-user', isStaff);
  }

  setTimezone(timezone: string) {
    this.setCookie('timezone', timezone);
    config.timezone = timezone
  }

  setCookie(name, value, opt = {}) {
    let expirationTime = new Date(Date.now() + 7*24*60*60*1000);
    opt = {expires: expirationTime, domain: environment.domain, ...opt};
    Cookies.set(name, value, opt);
  }

  getNewUser(): boolean {
    let newUser = Cookies.get('new-user');
    return newUser && (newUser === true || newUser === 'true');
  }

  getStaffUser(): boolean {
    let staffUser = Cookies.get('staff-user');
    return staffUser && (staffUser === true || staffUser === 'true');
  }

  patchAccountUser(currentAccountUser: Partial<IAccountUser>) {
    let options = this.getAdminReqOpt();
    let patch$ = this.getUser().take(1).switchMap((accountUser: IAccountUser) => {
      return this.http.patch<IAccountUser>(`app/account_users/${accountUser.id}/`, currentAccountUser, options)
    });
    return patch$;
  }

  patchAccount() {

  }

  patchSubAccount() {

  }

  getUpdatedAccountOfSubAccount(updatedSubAccount: ISubAccount): Observable<IAccount> {
    return this.getAccount().take(1).map((account: IAccount) => {
      let sub_accounts = _.map(account.sub_accounts, (subAccount: ISubAccount) => {
        if(subAccount.id == updatedSubAccount.id) {
          return updatedSubAccount
        } else {
          return subAccount
        }
      });
      return {...account, sub_accounts}
    })
  }

  billingSummary() {
    return this.http.get(`app/billing/summary/`).map(res => _.values(res))
  }

  resendInvite(email: string) {
    return this.getAccount().take(1).switchMap((account: IAccount) => {
      return this.http.post(`app/accounts/${account.id}/resend_invite/`, {email})
    })
  }

  private getAdminReqOpt() {
    let headers = {'Authorization': `token ${config.adminToken}`};
    return {headers}
  }

  private refreshPage() {
    location.href = location.href;
  }

  getEventChoices() {
    return this.http.get(`app/events/choices/`)
  }

  addWebhook(obj: { type: string; url: any; has_allowed_all: boolean; allowed_events: string[] }) {
      return this.http.post<IWebhook>(`app/webhooks/`, obj)
  }

  getWebhooks() {
      return this.http.get<Page<IWebhook>>(`app/webhooks/?page_size=10000`)
  }

  deleteWebhook(webhookId: string) {
      return this.http.delete(`app/webhooks/${webhookId}/`)
  }

  getGroups(query: object) {
    let string = HtQuerySerialize(query);
    return this.http.get<Page<any>>(`app/groups/?${string}`)
  }

  removeAccountUser(email: string) {
    return this.getAccount().take(1).switchMap((account: IAccount) => {
      return this.http.post(`app/accounts/${account.id}/remove_account_user/`, {email})
    })
  }

  getInvoices(query = {}) {
    return this.getAccount().take(1).switchMap((account: IAccount) => {
      let string = HtQuerySerialize(query);
      return this.http.get<Page<IInvoices>>(`app/invoices/?ordering=-end_date&${string}`)
    })
  }

  makePayment(invoiceId: string) {
    return this.http.post(`app/invoices/${invoiceId}/make_payment/`, {})
  }

  downloadInvoice(invoiceId: string) {
    return this.http.get(`https://api.hypertrack.com/api/v1/invoices/${invoiceId}/html/`, {responseType: 'text'})
    // return this.http.get(`app/invoices/${invoiceId}/html/`)
  }

  testWebhook(webhookId: string, eventType: string) {
    return this.http.post(`app/webhooks/${webhookId}/fire_sample_webhook/?event_type=${eventType}`, {})
  }

  rollKey(subAccountId: string, scope: "publishable" | "secret", username: string) {
    return this.http.post(`app/subaccounts/${subAccountId}/initiate_key_roll/`, {scope, username})
  }

  confirmRollKey(token_id: string) {
    this.getUser().take(1).subscribe((user) => {
      console.log("user", user);
    })
    return this.getSubAccount().map((subAccount) => {
      return subAccount.id
    }).take(1)
      .switchMap((subAccountId: string) => {
        return this.http.post(`app/subaccounts/${subAccountId}/confirm_key_roll/`, {token_id})
      })
  };

  setBillingPlan(plan) {
    this.getAccount().take(1).pluck('id').subscribe((id: string) => {
      this.http.post(`app/accounts/${id}/change_plan/`, {plan}).subscribe((account: IAccount) => {
        this.store.dispatch(new fromAccountUser.PatchAccountAction(account))
      })
    })

  }
}
