import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/map";
import {AccountUsersService} from "../account/account-users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
      private accountUserService: AccountUsersService,
  ) {

  }

  ngOnInit() {
    this.accountUserService.logout(false)
  }

}
