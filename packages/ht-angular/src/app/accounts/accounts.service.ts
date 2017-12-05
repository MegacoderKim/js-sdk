import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IAccount, IAccountUser, IMembership, Page} from "ht-models";
import {HttpClient} from "@angular/common/http";
import {filter, skip, tap} from "rxjs/operators";
import {StorageService} from "../internal/storage.service";
import {GetSecretToken, getAuthHeaders} from "ht-data";
import {Observable} from "rxjs/Observable";
import {HtClientService} from "../ht/ht-client.service";
import {HtAccountService} from "../ht/ht-account-users.service";

@Injectable()
export class AccountsService {
  accountUsers$: Observable<IAccountUser>;
  // memberships$: BehaviorSubject<null | Page<IMembership>> = new BehaviorSubject(null);
  memberships$: Observable<Page<IMembership>>;
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private client: HtClientService,
    private accountClient: HtAccountService
  ) {
    this.accountUsers$ = this.accountClient.accountUser.data$;
    this.memberships$ = this.accountClient.memberships.data$;
    this.getAccountUser()
  }
  environment: 'production' | 'test' = 'production';

  login(user) {

    return this.accountClient.api.login(user).pipe(
      tap((accountsUser: IAccountUser) => {
        this.setAccountUsers(accountsUser)
      })
    )
  };

  logout() {
    this.storage.removeAll();
    location.reload()
  };

  fetchAccountUsers(id, token): Observable<IAccountUser> {
    const headers = getAuthHeaders(token);
    return this.http.get<IAccountUser>(`https://api.hypertrack.com/api/v1/account_users/${id}`, {headers})
  }

  getAccountUser() {
    const token = this.storage.getToken();
    const tempToken = this.storage.getTempToken();
    const id = this.storage.getUserId();
    if (token && id) {
      this.client.token = token;
      this.accountClient.setToken(token);
      if (tempToken) this.client.tempToken = tempToken;
      // this.fetchAccountUsers(id, token).subscribe((accountUser) => {
      //   this.setAccountUsers(accountUser)
      // });
      this.accountClient.accountUser.setId(id);
      this.accountClient.accountUser.data$
        .pipe(
          filter(data => !!data),
          skip(1)
        )
        .subscribe((accountUser) => {
        this.setAccountUsers(accountUser)
      });

      // this.accountClient.memberships.data$
      //   .pipe(filter(data => !!data))
      //   .subscribe((mem) => {
      //   console.log("mem", mem);
      // })
      // this.accountClient.api.membershipsAll(id, {}, {headers: getAuthHeaders(token)}).subscribe((members) => {
      //   this.memberships$.next(members)
      // })
    }


  }

  setAccountUsers(accountUser: IAccountUser) {
    // this.accountUsers$.next(accountUser);
    const account = accountUser.default_account;
    const id = accountUser.id;
    this.setAccount(account);
    this.storage.setUserId(id);
  }

  setAccount(account: IAccount, admin = true) {
    const token = GetSecretToken(account, this.environment);
    this.client.token = token;
    admin ? this.storage.setToken(token) : this.storage.setTempToken(token)
  };

  setMembership(membership: IMembership) {
    console.log(membership);
    this.setAccount(membership.account, false);
    location.reload()
  }

}
