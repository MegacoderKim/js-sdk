import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountUsersService} from "../../account/account-users.service";
import {IAccountUser} from "ht-models";
import {BroadcastService} from "../../core/broadcast.service";
import {AuthLessReqOptions} from "../../../utils/api-helper";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  logoImg = require("images/logoblack.svg");
  loading: boolean = false;
  message: string;
  error;
  verified: boolean;
  failedVerification: boolean;
  user: User = {
    username: "",
    password: ''
  };
  disableUsername: boolean = false;
  invitedAccountId: string;
  @Input() toRedirect: boolean = true;
  constructor(
    private http: HttpClient,
    private accountUserService: AccountUsersService,
    private route: ActivatedRoute,
  ) {

  }

  getParameterByName(name: string): string {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  ngOnInit() {
    if(this.route.snapshot.params.reset) {
      this.message = "Your password has been reset"
    }
    if (this.getParameterByName('verified') == "true") {
      this.verified = true;
    } else if (this.getParameterByName('verified') == "false") {
      this.failedVerification = true;
    }
    if(this.route.snapshot.params['email'] && this.route.snapshot.params['account_id']) {
      this.user.username = this.route.snapshot.params['email'];
      this.invitedAccountId = this.route.snapshot.params['account_id'];
      this.disableUsername = true;
    }

  }

  onSubmit() {
    if(this.loading) return false;
    this.loading = true;
    this.error = null;
    this.message = null;
    if(this.invitedAccountId) {
      let obj = {email: this.user.username, account_id: this.invitedAccountId};
      this.http.post("app/accounts/accept_invite/", obj)
        .subscribe(response => {
          // console.log(response);
          this.login(this.invitedAccountId);
        })
    } else {
      this.login()
    }

  }

  login(accountId?) {
    let options = AuthLessReqOptions();
    this.accountUserService.login(this.user, options).subscribe((user: IAccountUser) => {
      this.accountUserService.setUser(user, () => {
        console.log("user", user);
        this.handleRedirect(user)
      }, accountId);
    }, (error) => {
      if(error.status == 400) {
        this.error = error;
        console.log(error);
        this.message = "Wrong username or password";
      } else if (error.status == 403) {
        this.message = "Please verify your email";
      } else if (error.status == 401) {
        this.message = "Please verify your email";
      } else {
        this.message = "There was an error. Please try again."
      }
      this.loading = false;
    });
  }

  handleRedirect(data) {
    let redirectUrl = this.getParameterByName("next");
    redirectUrl = redirectUrl && redirectUrl.indexOf('dashboard') > -1 ? redirectUrl : null;
    if(!this.toRedirect) {
      window.location.reload();
      return false
    }
    if(data.userId) {
      window.location.href = '/verify/' + data.userId
    } else if (data.is_new_user) {
      redirectUrl = redirectUrl || '/setup';
      window.location.href = redirectUrl;
    } else {
      redirectUrl = redirectUrl || '/';
      window.location.href = redirectUrl;
    }
  }

}
interface User {
  userId?: string,
  username: string,
  password: string
}
