import { Component, OnInit } from '@angular/core';
import {AccountUsersService} from "../account/account-users.service";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  accountUser$;
  constructor(private accountUserService: AccountUsersService) { }

  ngOnInit() {
    this.accountUser$ = this.accountUserService.getUser();
    // this.accountUserService.hydrateAccountUser()
  }

}
