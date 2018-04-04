import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountUsersService} from "../account/account-users.service";
import {IAccountUser} from "ht-models";
import {AuthLessReqOptions} from "../../utils/api-helper";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.less']
})
export class VerificationComponent implements OnInit {
  redirect;
  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private accountUserService: AccountUsersService
  ) { }

  ngOnInit() {
    let userId = this.route.snapshot.params['userId'];
    let verificationCode = this.route.snapshot.params['verificationCode'];
    this.redirect = this.route.snapshot.queryParams['next'];
    let obj = {
      user_id: userId,
      verification_id: verificationCode
    };
    this.verify(obj)
  }

  private verify(obj: { user_id: any; verification_id: any }) {
    let options = AuthLessReqOptions();
    this.http.post(`app/verify_email/`, obj, options).subscribe((user: IAccountUser) => {
      this.accountUserService.setUser(user, () => {
        this.handleRedirect(user);
      });
    })
  }

  handleRedirect(data) {
    let redirectUrl = '/';
    if (data.is_new_user) {
      redirectUrl = '/setup';
    }
    window.location.href = this.redirect || redirectUrl;
  }
}
