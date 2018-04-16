import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../core/local-storage.service";
import {IAccountUser, IMembership} from "ht-models";
import {GetAccountFromMemberships, isCurrentAccount} from "../../../utils/account-user-helper";
import {config} from "../../config";
import {Observable} from "rxjs/Observable";
import {AccountUsersService} from '../../account/account-users.service';
import {combineLatest} from "rxjs/observable/combineLatest";

@Component({
  selector: 'app-main-redirect',
  templateUrl: './main-redirect.component.html',
  styleUrls: ['./main-redirect.component.less']
})
export class MainRedirectComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private accountService: AccountUsersService
  ) { }

  ngOnInit() {
    // todo fix for account
    combineLatest(
      this.storage.getUser(),
      this.storage.getMemberships()
    ).subscribe(([accountUser, memberships]: [IAccountUser, IMembership[]]) => {
      if (accountUser) {
        let account = isCurrentAccount(accountUser.default_account, config.token, config.tokenType) || !memberships ?
          accountUser.default_account : 
          GetAccountFromMemberships(memberships, config.token, config.tokenType) || accountUser.default_account;
        let defaultView = config.isMobile ? 'map' : 'list';
        if (!account) {
          // this.accountService.logout()
        }
        if(account.card) {
          this.router.navigate(['/', defaultView, 'actions'], {relativeTo: this.route})
        } else {
          this.router.navigate(['/', defaultView, 'users'], {relativeTo: this.route})
        }
      } else if(config.isDemo) {
        this.router.navigate(['/', 'map', 'users'], {relativeTo: this.route})
      } else {
        console.log('logginput');
        this.router.navigate(['/', 'login'])
      }
    })
  }

}
