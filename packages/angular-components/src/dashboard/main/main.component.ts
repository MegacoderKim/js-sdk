import { Component, OnInit } from '@angular/core';
import {AccountUsersService} from "../account/account-users.service";
import {IAccount, IAccountUser, IMembership} from "ht-models";
import {Router} from "@angular/router";
import {config} from "../config";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(
    private accountUserService: AccountUsersService,
    private router: Router
  ) { }

  ngOnInit() {
    let isStaff = config.isStaff;
    this.accountUserService.getAccount().filter(data => !!data).take(1).subscribe((account: IAccount) => {
      this.accountUserService.getAccountDataFromServer(account.id).subscribe((account: IAccount) => {
        this.accountUserService.getUser().take(1).subscribe((accountUser: IAccountUser) => {
          if (!account.is_agreement_signed && this.canSignAgreement(accountUser, account) && !isStaff) {
            let url = location.href;
            this.accountUserService.updateAccountWithoutPatch(account);
            this.router.navigate(['/agreement'], {queryParams: {next: url}});
          }
        });
      });
    });
  }

  canSignAgreement(accountUser, account) {
    return true
    // let membership = _.find(accountUser.memberships, (member: IMembership) => {
    //   return (member.account.id === account.id);
    // });
    // return membership ? membership.role !== 'read_only' : false;
  }
}
