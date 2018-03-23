import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthLessReqOptions} from "../../../utils/api-helper";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
  logoImg = require("images/logoblack.svg");
  resetPassword: FormGroup;
  errorMessage: string;
  passwordValidationMessage: string;
  confirmPasswordValidationMessage: string;
  passwordsMatchValidationMessage: string;
  loading: boolean = false;
  error;
  constructor(
      private http: HttpClient,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.resetPassword = this.fb.group({
      matchingPassword: this.fb.group({
        password: ['', (control) => this.passwordValidator(control)],
        confirmPassword: ['', (control) => this.confirmPasswordValidator(control)]
      }, {validator: (control) => this.areEqualValidator(control)}),
    });
  }

  passwordValidator(control) {
    if (control.value === "") {
      this.passwordValidationMessage = "Please provide a password";
      return {
        validationError: "Empty Password"
      }
    } else {
      this.passwordValidationMessage = null;
      return null;
    }
  }

  confirmPasswordValidator(control) {
    if (control.value === "") {
      this.confirmPasswordValidationMessage = "Please confirm password";
      return {
        validationError: "Empty Confirm Password"
      }
    } else {
      this.confirmPasswordValidationMessage = null;
      return null;
    }
  }

  areEqualValidator(group: FormGroup) {
    let val;
    let valid = true;
    if(group.get('password').value  !== "" && group.get('confirmPassword').value !== ""
        && group.get('password').value !== group.get('confirmPassword').value) {
      this.passwordsMatchValidationMessage = "Passwords must match ";
      return {
        validationError: "Passwords must match"
      }
    } else {
      this.passwordsMatchValidationMessage = null;
      return null;
    }
  }

  onSubmit() {
    this.loading = true;
    if(this.resetPassword.valid) {
      let params = this.route.snapshot.params;
      let new_password = this.resetPassword.value.matchingPassword.password;
      let options = AuthLessReqOptions();
      this.http.post(`app/auth/password/reset/confirm/`, {...params, new_password}, options).subscribe(data => {
        this.loading = false;
        this.router.navigate(['/login', {reset: true}])
      }, err => {
        if(err.status = 400) {
          this.errorMessage = "This link has expired"
        }
        this.error = err;
        this.loading = false
      })
    } else {
      this.resetPassword.markAsTouched();
      this.loading = false;
      this.error = true;
    }
  }

}
