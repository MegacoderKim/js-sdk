import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {share} from "rxjs/operators";
import {IMembership} from "ht-models";
import {IAccount} from "ht-models/dist/typings/account";

@Component({
  selector: 'ht-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public accountsService: AccountsService
  ) { }

  ngOnInit() {
  }

  get accountsUser$() {
    return this.accountsService.accountUsers$.pipe(share());
  }

  get memberships$() {
    return this.accountsService.memberships$
  }

  logout() {
    this.accountsService.logout()
  }

  setAccount(account: IAccount) {
    this.accountsService.setAccount(account, false);
    location.reload()
  }
}
