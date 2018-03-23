import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {config} from "../../../config";
import {Observable} from "rxjs/Observable";
import {ISubAccount} from "ht-models";
import {AccountUsersService} from "../../../account/account-users.service";
import {OnboardingService} from "../../onboarding.service";

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.less']
})
export class SignupBoxComponent implements OnInit {
  showSignup: boolean = true;
  isSignedUp: boolean = false;
  isLoggedIn: boolean;
  pkValue: string;
  subAccount$: Observable<ISubAccount>;
  constructor(
    private accountUserService: AccountUsersService,
    public onBoardingService: OnboardingService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.getIsLoggedIn();
    this.subAccount$ = this.accountUserService.getSubAccount();
    this.subAccount$.take(1).subscribe((subAccount: ISubAccount) => {
      if (subAccount && subAccount.tokens) {
        let pkToken = subAccount.tokens.find((token) => token.scope === 'publishable' );
        this.pkValue = pkToken ? pkToken.key : null;
      }
    });
  }

  getIsLoggedIn() {
    return (!!config.token && !config.isDemo);
  }

  onSignupForSubmit(data) {
    this.isSignedUp = true;
  }

  openSignupModal() {
    this.showSignup = true;
  }

  openLoginModal() {
    this.showSignup = false;
  }

}
