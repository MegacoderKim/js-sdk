import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import * as fromAccountUser from "../actions/account-user";
import * as fromRoot from "../reducers";
import {StorageService} from "../core/local-storage.service";
import {Store} from "@ngrx/store";
import {AccountUsersService} from "../account/account-users.service";
import {IAccount, IAccountUser, ISubAccount, PartialAccount} from "ht-models";
import {config} from "../config";
import {getToken} from "../../utils/secret-token";
import {UpdateDefaultAccount} from "../../utils/account-user-helper";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import * as _ from "underscore";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {catchError, filter, map, switchMap, take, tap} from "rxjs/operators";

@Injectable()
export class AccountUserEffectsService {

    constructor(
        private actions$: Actions,
        private localStorage: StorageService,
        private http: HttpClient,
        private accountUserService: AccountUsersService,
        private store: Store<fromRoot.State>,
        private snackbarService: SnackbarService
    ) { }

    @Effect({ dispatch: false })
    updateAccountUser$: Observable<any>  = this.actions$
        .ofType(fromAccountUser.SET_ACCOUNT_USER).pipe(
          tap((action: fromAccountUser.SetAccountUserAction) => {
            // console.log("new user", action.payload);
            this.localStorage.setUser(action.payload)
          }),
      );

    @Effect()
    updateAccount$: Observable<any>  = this.actions$
        .ofType(fromAccountUser.UPDATE_ACCOUNT).pipe(
        map((action: fromAccountUser.UpdateAccountAction) => {
          return action.payload.data;
        }),
        switchMap((updatedAccount: PartialAccount) => {
          let patch$ = this.accountUserService.getAccount().pipe(
            take(1),
            switchMap((account: IAccount) => {
              return this.http.patch(`app/v1/accounts/${account.id}/`, updatedAccount)
            })
          );
          return patch$
        }),
        map((account: IAccount) => {
          return new fromAccountUser.PatchAccountAction(account);
        })
      )


    @Effect()
    updateSubAccount$: Observable<any>  = this.actions$
        .ofType(fromAccountUser.UPDATE_SUB_ACCOUNT).pipe(
        map((action: fromAccountUser.UpdateSubAccountAction) => {
          return action.payload.data;
        }),
        switchMap((newSubAccount: ISubAccount) => {
          // console.log(config);
          console.log("new sub", newSubAccount);
          let patch$ = this.accountUserService.getSubAccount().pipe(
            take(1),
            switchMap((subAccount: ISubAccount) => {
              let token = getToken(subAccount.tokens, 'secret');
              let headers = {
                'Authorization': 'token ' + token,
                'Content-Type': 'application/json'
              };
              return this.http.patch(`app/v1/subaccounts/${subAccount.id}/`, newSubAccount, {headers: headers})
            })
          );
          return patch$
        }),
        switchMap((updatedSubAccount: ISubAccount) => {
          return this.store.select(fromRoot.getCurrentAccount).pipe(
            take(1),
            map((account: IAccount) => {
              let sub_accounts = _.map(account.sub_accounts, (subAccount: ISubAccount) => {
                if(subAccount.id == updatedSubAccount.id) {
                  return updatedSubAccount
                } else {
                  return subAccount
                }
              });
              return {...account, sub_accounts}
            })
          )
        }),
        map((account: IAccount) => {
          return new fromAccountUser.PatchAccountAction(account);
          // return this.updateAccount(account)
        })
      );

    @Effect()
    updateAccountUserPost$: Observable<any> = this.actions$
        .ofType(fromAccountUser.UPDATE_ACCOUNT_USER)
        .pipe(
          switchMap((action: fromAccountUser.UpdateAccountUserAction) => {
            let accountUser = {...action.payload.data};
            return this.accountUserService.patchAccountUser(action.payload.data).map((user) => {
              return new fromAccountUser.SetAccountUserAction(user)
            })
          })
        );

    @Effect()
    getAccountUser$: Observable<any> = this.actions$
        .ofType(fromAccountUser.GET_ACCOUNT_USER).pipe(
        switchMap((action: fromAccountUser.GetAccountUserAction) => {
          let accountUserId = action.payload;
          let headers = {'Authorization': `token ${config.adminToken}`};
          return this.http.get<IAccountUser>(`app/v1/account_users/${accountUserId}/`, {headers}).map((user) => {
            return new fromAccountUser.SetAccountUserAction(user)
          }).pipe(
            catchError(() => of(null)),
            filter((data) => !!data)
          )
        })
      );

    @Effect()
    patchAccount$: Observable<any> = this.actions$
      .ofType(fromAccountUser.PATCH_ACCOUNT).pipe(
        map((action: fromAccountUser.PatchAccountAction) => {
          let account = action.payload;
          return this.updateAccount(account)
        })
      )

  updateAccount(account: IAccount) {
    if (config.isDefaultAccount) {
      return new fromAccountUser.PatchDefaultAccountAction(account)
    } else {
      return new fromAccountUser.PatchMembershipsAction(account)
    }
  }

  // updateAccountUser(accountUser: IAccountUser) {
  //   if (config.isDefaultAccount) {
  //     return new fromAccountUser.UpdateAccountUserAction(accountUser)
  //   } else {
  //     return new fromAccountUser.PatchMembershipsAction(account)
  //   }
  // }

}
