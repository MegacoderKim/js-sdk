import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthLessReqOptions} from "../../../utils/api-helper";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {
  logoImg = require("images/logoblack.svg");
  loading: boolean = false;
  message: string;
  error;
  email: string
  disableUsername: boolean = false;
  invitedAccountId: string;
  done: boolean = false;
  resetPassword: FormGroup;
  constructor(
      private http: HttpClient,
      private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.resetPassword = this.fb.group({
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if(this.resetPassword.valid) {
      this.loading = true;
      this.error = null;
      let obj = {email: this.resetPassword.value.email};
      let options = AuthLessReqOptions();
      this.http.post("app/auth/password/reset/", obj, options)
          .subscribe(response => {
            this.message = "Reset password mail has been sent";
            // console.log(response);
            this.loading = false;
            this.done = true
          }, err => {
            console.log(err);
            this.loading = false;
            this.error = true;
            // if(err.status == 400 ) this.error = true
          })
    }


  }

}
