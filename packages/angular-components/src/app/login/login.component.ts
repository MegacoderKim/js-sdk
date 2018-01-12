import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";
import {IAccountUser} from "ht-models";
import {HtClientService} from "../ht/ht-client.service";
import {GetSecretToken} from "ht-data";

@Component({
  selector: 'ht-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    username: "",
    password: ""
  };
  loading: boolean = false;

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private htClient: HtClientService,
  ) { }

  ngOnInit() {
  }

  close() {
    this.router.navigate([{outlets: {modal: null}}])
  }

  login() {
    this.loading = false;
    this.accountsService.login(this.user).subscribe((accountsUser: IAccountUser) => {
      this.loading = true;
      this.close();
      location.reload()
      // this.htClient.token = accountsUser.default_account.
    })
  }

}
