import { Component, OnInit } from '@angular/core';
import {AccountUsersService} from "../account/account-users.service";
import {Router} from "@angular/router";
import {IAccount, IAccountUser} from "ht-models";
import {AgreementService} from "./agreement.service";

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.less']
})
export class AgreementComponent implements OnInit {

  constructor(
    private accountUserService: AccountUsersService,
    private router: Router,
    private agreementService: AgreementService
  ) { }

  ngOnInit() {

  }

  onAcceptAgreement() {
    this.accountUserService.getAccount().filter(data => !!data).take(1).subscribe((account: IAccount) => {
      this.accountUserService.getUser().take(1).subscribe((accountUser: IAccountUser) => {
        let acceptorEmail =  accountUser.email;
        let saasAgreementType = 'saas-06282017';
        let accountId = account.id;
        let data = {
          "acceptor_email": acceptorEmail,
          "type": saasAgreementType
        };
        this.agreementService.sendSAASAgreementAcceptance(accountId, data).subscribe((res) => {
          if (res.status === 200) {
            let redirectUrl = this.getParameterByName("next");
            redirectUrl = redirectUrl && redirectUrl.indexOf('dashboard') > -1 ? redirectUrl : null;
            redirectUrl = redirectUrl || '/';
            window.location.href = redirectUrl;
          } else {
            console.log("Failed to accept agreement", res);
          }
        });
      });
    });
  }

  getParameterByName(name: string): string {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}
