import {Component, Input, OnInit} from '@angular/core';
import {HomePageService} from "../../../home-page/home-page.service";
import {SignupService} from "../../../services/signup.service";
import {config} from '../../../config';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ExternalAnalyticsService} from "../../../services/external-analytics.service";
import * as jstz from "jstz";
import {FormBuilder, FormGroup, Validator} from "@angular/forms";
import {Http} from "@angular/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  @Input() showFullSignup: boolean = true;
  images = {
    blackLogo: require("../../../../assets/images/logoblack.svg"),
    logo : require("../../../../assets/images/hypertrack-logo-box-green.png"),
    zomatoLogo: require("../../../../assets/images/zomato.png"),
    housejoyLogo: require("../../../../assets/images/housejoy.png"),
    goibiboLogo: require("../../../../assets/images/goibibo.png"),
    delhiveryLogo: require("../../../../assets/images/delhivery.png"),
    redbusLogo: require("../../../../assets/images/redbus.png"),
    roseRocketLogo: require("../../../../assets/images/roserocket.png"),
    topprLogo: require("../../../../assets/images/toppr-1.png"),
    freshdeskLogo: require("../../../../assets/images/freshdesk.png"),
    roseRocketAlex: require("../../../../assets/images/alex.jpg"),
    okhiRamogi: require("../../../../assets/images/okhi.png")
  };
  metrics = {
    miles: 6000000
  };
  formData = {
    email: '',
    password: ''
  };
  errors = {
    formError: '',
    signupError: ''
  };
  verificationSent: boolean = false;
  invitedAccountId: string;
  signingUp: boolean = false;
  signupForm: FormGroup;
  emailValidationMessage: string;
  billingPlan: string | null;
  constructor(
    private fb: FormBuilder,
    private homePageService: HomePageService,
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private externalAnalyticsService: ExternalAnalyticsService
  ) {
    this.route.queryParams.pluck('plan').distinctUntilChanged().subscribe((plan: string) => {
      this.billingPlan = plan;
    })
  }

  ngOnInit() {
    this.setupFormBuilder();
    this.homePageService.getMetrics().subscribe((data) => {
      this.metrics.miles = (data && data.miles) ? data.miles : 6000000;
    });
    this.invitedAccountId = this.route.snapshot.params['accountId'];
    if (this.invitedAccountId) {
      this.signupForm.get('email').disable();
      this.signupForm.get('email').setValue(this.route.snapshot.params['email'])
    }
  }

  setupFormBuilder() {
    if (this.showFullSignup) {
      this.signupForm = this.fb.group({
        email: [''],
        password: [''],
        packageName: [''],
        usecases: [['']],
        agreement: ['']
      });
    } else {
      this.signupForm = this.fb.group({
        email: [''],
        password: [''],
        packageName: [''],
        usecases: [['']],
        agreement: ['']
      });
    }
  }

  onFormValueChange(formInput, value) {
    this.resetFormErrors();
  }

  onFormSubmit() {
    if (this.signingUp) {
      return;
    }
    this.verificationSent = false;
    this.errors.signupError = null;
    this.errors.formError = null;
    if (this.validateFormData()) {
      this.signingUp = true;
      let signupData: ISignupImplicitData = this.getImplicitSignupData();
      let user: ISignupData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        ...signupData
      };
      user = this.billingPlan ? {...user, billing_plan: this.billingPlan} : user;
      const url = this.invitedAccountId ?
        `https://api.hypertrack.com/api/v1/accounts/accept_invite/` : `https://api.hypertrack.com/api/v1/signup/`;
        this.http.post(url, user).map(res => res.json()).subscribe((data) => {
        this.signingUp = false;
        this.errors.signupError = null;
        this.verificationSent = true;
        this.externalAnalyticsService.logSegmentIdentify({
          signupSource : this.getCurrentURL(),
          signup_referral: config.htReferrerURL || 'Direct',
          landing_url: config.htLandingURL || '--',
          ...user,
          email : user.email
        });
        if (this.invitedAccountId) location.href = "https://dashboard.hypertrack.com/login"
        this.externalAnalyticsService.logSegmentEvent( "signup", "conversion", "signup", {
          signupSource : this.getCurrentURL(),
          signup_referral: config.htReferrerURL || 'Direct',
          landing_url: config.htLandingURL || '--',
          ...user,
          email : user.email
        });
        this.externalAnalyticsService.logGAEvent('send', {
          eventCategory: "conversion",
          eventAction: "signup",
          eventLabel: "signup",
          eventData: {
            signupSource : this.getCurrentURL(),
            signup_referral: config.htReferrerURL || 'Direct',
            landing_url: config.htLandingURL || '--',
            ...user,
            email : user.email
          }
        });
        this.externalAnalyticsService.logGAEvent('oldTracker.send', {
          eventCategory: "conversion",
          eventAction: "signup",
          eventLabel: "signup",
          eventData: {
            signupSource : this.getCurrentURL(),
            signup_referral: config.htReferrerURL || 'Direct',
            landing_url: config.htLandingURL || '--',
            ...user,
            email : user.email
          }
        });
        this.externalAnalyticsService.sendClearbitEvent(user.email);
      }, (error) => {
        this.signingUp = false;
        this.errors.signupError = "Oops! Something went wrong, please try again.";
        if (error.status === 400) {
          this.errors.signupError = "This email already has an account"
        }
        this.externalAnalyticsService.logSegmentEvent( "signup error", "interaction", "signup", {
          signupSource : this.getCurrentURL(),
          error : error
        });
      })
    }
  }

  handleEnterKeyPress($event) {
    $event.preventDefault();
    this.onFormSubmit();
  }

  validateFormData() {
    let email = this.signupForm.get('email').value;
    this.signupForm.get('email').markAsDirty();
    this.signupForm.get('password').markAsDirty();
    let password = this.signupForm.value.password;
    if (!email || !this.validateEmail(email)) {
      this.errors.formError = "Please enter a valid email";
      return false;
    } else if (password === "") {
      this.errors.formError = "Please provide a password";
      return false;
    } else if (password.length < 8) {
      this.errors.formError = "Password must be atleast 8 characters";
      return false;
    } else {
      this.resetFormErrors();
      return true;
    }
  }

  resetFormErrors() {
    this.errors.formError = null;
  }

  getImplicitSignupData(): ISignupImplicitData {
    let timezone =  jstz.determine();
    let referrer = this.getReferralURL();
    let currentURL = this.getCurrentURL();
    let platform: string = '';
    let packageName: string = '';
    let data: ISignupImplicitData = {
      agreement_type: "saas-06282017",
      timezone: timezone.name(),
      signup_referral: referrer,
      signup_location: currentURL,
      app_platform: platform,
      package_name: packageName
    };
    let testAccountId = this.route.snapshot.queryParams['testAccountId'] || this.signupService.testAccountId;
    let nextURL = this.route.snapshot.queryParams['nextURL'] || this.signupService.nextURL;
    if (this.invitedAccountId) {
      data = {...data, account_id: this.invitedAccountId, email: this.route.snapshot.params['email']}
    }
    if (testAccountId) {
      data = {
        ...data,
        test_account_id: testAccountId
      }
    }
    if (nextURL) {
      data = {
        ...data,
        redirect_url: nextURL
      }
    }
    return data;
  }

  getReferralURL() {
    let referrer = window.document.referrer || 'Direct URL';
    return `${referrer}`;
  }

  getCurrentURL() {
    return window.location.href;
  }

  private passwordValidator(control) {
    if (!control.dirty) {
      this.errors.formError = null;
      return null
    } else if (control.value.length < 5) {
      this.errors.formError = "Password must be atleast 4 characters";
      return {'shortPassword': true}
    } else {
      this.errors.formError = null;
      return null
    }
  }

  private emailValidator(control) {
    if (!control.dirty || !control.touched) {
      this.errors.formError = null;
      return null;
    } else if (control.value === "") {
      this.errors.formError = "Please provide an email address";
      return { 'emptyEmail': true };
    } else if (!this.validateEmail(control.value)) {
      this.errors.formError = "Please provide a valid email address";
      return { 'invalidEmailAddress': true };
    } else {
      this.errors.formError = null;
      return null;
    }
  }

  private validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailValidationMessage = re.test(email) ? undefined : "Please provide a valid email address";
    return re.test(email);
  }
}

export interface ISignupImplicitData {
  package_name: string;
  app_platform: string;
  signup_referral: string;
  signup_location: string;
  timezone: string;
  agreement_type: string;
  redirect_url?: string;
  account_id?: string;
  test_account_id?: string;
  billing_plan?: string
  email?: string;
}

export interface ISignupData extends ISignupImplicitData {
  password: string;
  email: string
}
