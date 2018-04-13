import { Component, OnInit } from '@angular/core';
import {AccountUsersService} from "../account/account-users.service";
import {FormBuilder} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.less']
})
export class WaitlistComponent implements OnInit {

  logoImg = require("../../images/logoblack.svg");
  public loading: boolean = false;
  public message: string;
  public error;
  public emailValidationMessage: string;
  public urlValidationMessage: string;
  signupForm: FormGroup;
  invitedAccountId: string;
  joined: boolean = false;
  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private accountUserService: AccountUsersService
  ) {
    this.signupForm = fb.group({
      email: ['', (control) => this.emailValidator(control)],
      productURL: ['', (control) => this.urlValidator(control)],
    });
  }

  ngOnInit() {
    this.accountUserService.logout(false)
  }

  urlValidator(control) {
    let urlRegex =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let urlExpression = new RegExp(urlRegex);
    let isValidURL = (urlExpression.test(control.value) || control.value === "");
    if (!isValidURL) {
      this.urlValidationMessage = "Please provide a valid URL";
      return {
        "invalidURL": control.value
      }
    } else {
      this.urlValidationMessage = null;
      return null;
    }
  }

  emailValidator(control) {
    if (control.value === "") {
      this.emailValidationMessage = "Please provide an email address";
      return { 'emptyEmail': true };
    } else if (!this.validateEmail(control.value)) {
      this.emailValidationMessage = "Please provide a valid email address";
      return { 'invalidEmailAddress': true };
    } else {
      this.emailValidationMessage = null;
      return null;
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailValidationMessage = re.test(email) ? undefined : "Please provide a valid email address";
    return re.test(email);
  }

  onSubmit() {
    this.loading = true;
    this.error = null;
    let url = 'app/v1/waitlist/';
    var user = {
      email: this.signupForm.value.email,
      product_url: this.signupForm.value.productURL,
    };
    let options = { headers: { 'Content-Type': 'application/json' } }
    this.http.post(url, user, options).subscribe(data => {
      console.log(data);
      this.joined = true;
    }, (error) => {
      console.log(error);
      this.error = error;
      this.loading = false;
      if (error.status == 400) {
        console.log("user exists");
        this.message = "This email already has an account";
        console.log(this.message);
      }
    })
  }

}
