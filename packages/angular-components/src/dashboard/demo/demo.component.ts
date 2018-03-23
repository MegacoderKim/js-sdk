import { Component, OnInit } from '@angular/core';
import {IAccountUser} from "ht-models";
import {AccountUsersService} from "../account/account-users.service";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
var Cookies = require("js-cookie");

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent implements OnInit {
  message: string = "Logging into demo dashboard...";

  constructor(private http: HttpClient, private accountUserService: AccountUsersService) { }
  ngOnInit() {
    let expirationTime = new Date(Date.now() + 7*24*60*60*1000);
    Cookies.set('isDemo', true, {expires: expirationTime, domain: environment.domain});
    this.accountUserService.login({
      username: 'demo@hypertrack.com',
      password: 'demo1234'
    }).subscribe((user: IAccountUser) => {
      this.accountUserService.setUser(user, () => {

        console.log("user", user);
        this.handleRedirect(user)
      });
    }, (error) => {
      this.message = "There was a error, please try again!";
    });
  }

  handleRedirect(data) {
    let redirectUrl = '/';
    window.location.href = redirectUrl;
  }

}
