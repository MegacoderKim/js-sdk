import { Component, OnInit } from '@angular/core';
import {OnboardingService} from "../../onboarding.service";
import {AccountUsersService} from '../../../account/account-users.service';
import {config} from '../../../config';
import {ModalService} from '../../../core/modal.service';
import {ExternalAnalyticsService} from '../../../core/external-analytics.service';

@Component({
  selector: 'app-mail-developer-form',
  templateUrl: './mail-developer-form.component.html',
  styleUrls: ['./mail-developer-form.component.less']
})
export class MailDeveloperFormComponent implements OnInit {
  mailIds: any = {
    sourceEmail: "",
    developerEmail: ''
  };
  loading: boolean = false;
  emailValidationMessage: string = "";
  showSuccessMessage: boolean = false;
  constructor(
    private onBoardingService: OnboardingService,
    private accountsService: AccountUsersService,
    private modalService: ModalService,
    private externalAnalyticsService: ExternalAnalyticsService,
  ) { }

  getUser() {
    let accountUser;
    this.accountsService.getUser().filter(data => !!data).take(1).subscribe((user) => {
      accountUser = {...user};
      if ( accountUser.email ) {
        this.mailIds.sourceEmail = accountUser.email;
      }
    });
  }

  ngOnInit() {
    this.getUser();
    $('#mail-to-developer').on('show.bs.modal', (e) => {
      this.mailIds.sourceEmail = "";
      this.mailIds.developerEmail = "";
      this.showSuccessMessage = false;
      this.emailValidationMessage = "";
    })
  }

  onSubmit() {
    if (this.loading) return false;
    this.loading = true;
    this.showSuccessMessage = false;
    if ( this.validateEmail(this.mailIds.developerEmail) ) {
      this.externalAnalyticsService.logSegmentEvent( "invite developer", "interaction", "onboarding");
      this.emailValidationMessage = "";
      let values = {...this.mailIds, packageName: ''};
      this.onBoardingService.mailDeveloper(values).subscribe((data) => {
        this.loading = false;
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.modalService.close('mailDeveloperModal');
          this.mailIds.sourceEmail = "";
          this.mailIds.developerEmail = "";
          this.showSuccessMessage = false;
          this.emailValidationMessage = "";
        }, 2000);
      });
    } else {
      this.emailValidationMessage = this.validateEmail("") ? undefined : "Please provide valid email address";
      this.loading = false;
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  ngAfterViewInit() {
  }

  showValidationError() {
    return !(this.emailValidationMessage === "")
  }

}
