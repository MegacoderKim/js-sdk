import { Component, OnInit } from '@angular/core';
import { AccountUsersService } from '../../account/account-users.service';
import { Observable } from 'rxjs/Observable';
import { IAccount, PartialAccount } from 'ht-models';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-plan-options',
  templateUrl: './plan-options.component.html',
  styleUrls: ['./plan-options.component.less']
})
export class PlanOptionsComponent implements OnInit {
  plans = {
    paidActions: "paid_actions",
    paidUsers: "paid_users",
    freeToView: "free_to_view",
    freeForever: "free_forever:1",
    starter: "starter:1",
    regular: "regular:1"
  };
  account$: Observable<IAccount>;
  constructor(
    public accountUserService: AccountUsersService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.account$ = this.accountUserService.getAccount().do((_) => {
      this.snackbarService.hideLoadingToast()
    });
  }

  choosePlan(planType) {
    this.accountUserService.setBillingPlan(planType);
  }

  chooseEnterpice() {
    if ( window[ "Intercom"] ) {
      window["Intercom"]('showNewMessage', 'I am interested in the Enterprise plan. Could you give me more details about it ?');
    }
  }

}
