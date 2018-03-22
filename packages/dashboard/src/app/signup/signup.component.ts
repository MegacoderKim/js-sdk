import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
// import * as jstz from 'jstz';
import {AccountUsersService} from "../account/account-users.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {
  constructor(private accountUserService: AccountUsersService) {
    // window.location.href = 'https://www.hypertrack.com/signup';
  }

  ngOnInit() {
    this.accountUserService.logout(false)
  }
}
