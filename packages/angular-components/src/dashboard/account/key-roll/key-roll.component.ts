import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountUsersService} from "../account-users.service";
import {ISubAccount} from "ht-models";

@Component({
  selector: 'app-key-roll',
  templateUrl: './key-roll.component.html',
  styleUrls: ['./key-roll.component.less']
})
export class KeyRollComponent implements OnInit {
  loading: boolean = true;
  error = null;
  confirmed: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private accountUserService: AccountUsersService
  ) { }

  ngOnInit() {
    this.accountUserService.checkAccountUser();
    let token_id = this.route.snapshot.params['token'];
    this.accountUserService.confirmRollKey(token_id).subscribe((subAccount: ISubAccount) => {
      this.loading = false;
      this.confirmed = true;
      this.accountUserService.logout()
    }, err => {
      this.loading = false;
      this.error = err
    })
  }

}
