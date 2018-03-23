import { Component, OnInit } from '@angular/core';
import {AccountUsersService} from "../../account/account-users.service";
import {Observable} from "rxjs/Observable";
import {IAccountUser} from "ht-models";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.less']
})
export class AccountProfileComponent implements OnInit {
  showModal: boolean = false;
  accountUser$: Observable<IAccountUser>;
  constructor(
      private accountUserService: AccountUsersService,
      private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.accountUser$ = this.accountUserService.getUser()
  }

  updateFirstName(fname) {
    this.accountUserService.updateUser({first_name: fname}, 'fname')
  }

  update(obj, item) {
    this.accountUserService.updateUser(obj, item)
  }

  openChangePassword() {
    this.showModal = true
  }


  changePassword($event, oldPassword, newPassword, confirmedPassword): void {
    console.log("change password");
    $event.target.disabled = true;
    var obj = {"old_password": oldPassword.value, "new_password": newPassword.value}
    if (newPassword.value == confirmedPassword.value) {
      this.accountUserService.getUser().take(1).subscribe((accountUser: IAccountUser) => {
        this.accountUserService.changePassword(accountUser.id, obj).subscribe(() => {
          $event.target.disabled = false;
          this.showModal = false;
          // $("#reset-password").modal('hide');
          this.snackbarService.displaySuccessToast("Password changed successfully");
        }, err => {
          $event.target.disabled = false;
          if ((err.status == 401) || (err.status == 403)) {
            this.snackbarService.displayErrorToast("This action is not allowed");
          } else {
            console.log(err.error.error);
            const msg = err.error.error || "Error updating password";
            this.snackbarService.displayErrorToast(msg)
          }
        })
      });

    } else {
      this.snackbarService.displayErrorToast("Passwords do not match");
      $event.target.disabled = false;
    }
  }

}
