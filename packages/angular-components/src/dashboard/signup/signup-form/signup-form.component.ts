import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import * as jstz from "jstz";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {BroadcastService} from "../../core/broadcast.service";
import {SignupService} from "../signup.service";
import {HttpClient} from "@angular/common/http";
import {AuthLessReqOptions} from "../../../utils/api-helper";
import {ExternalAnalyticsService} from "../../core/external-analytics.service";


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.less']
})
export class SignupFormComponent implements OnInit {
  @Input() toRedirect: boolean = true;
  @Input() appPlatform: string;
  @Input() packageName: string;
  @Input() showFullSignup: boolean = true;
  @Input() showCustomVerificationMessage: boolean = false;
  @Output() onFormSubmit: EventEmitter<object> = new EventEmitter();
  public loading: boolean = false;
  public message: string;
  public error;
  public emailValidationMessage: string;
  public passwordValidationMessage: string;
  public confirmPasswordValidationMessage: string;
  public passwordsMatchValidationMessage: string;
  public urlValidationMessage: string;
  signupForm: FormGroup;
  invitedAccountId: string;
  testAccountId: string;
  verified: boolean = false;
  isSubmitted: boolean = false;
  redirectUrl: string = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    public broadcast: BroadcastService,
    private signupService: SignupService,
    private externalAnalyticsService: ExternalAnalyticsService
  ) {
  }

  handleInputKey(event) {
    event.stopPropagation();
  }

  ngOnInit() {
    this.setupFormBuilder();
    this.invitedAccountId = this.route.snapshot.params['accountId'];
    this.testAccountId = this.route.snapshot.queryParams['testAccountId'];
    this.redirectUrl = this.route.snapshot.queryParams['next_url'];
    if(this.packageName) {
      this.signupForm.get('packageName').setValue(this.packageName)
    }
    if(this.invitedAccountId) {
      this.signupForm.get('email').disable();
      this.signupForm.get('email').setValue(this.route.snapshot.params['email'])
    }
  }

  setupFormBuilder() {
    if (this.showFullSignup) {
      this.signupForm = this.fb.group({
        email: ['', (control) => this.emailValidator(control)],
        matchingPassword: this.fb.group({
          password: ['', (control) => this.passwordValidator(control)],
          confirmPassword: ['', (control) => this.confirmPasswordValidator(control)]
        }, {validator: (control) => this.areEqualValidator(control)}),
        packageName: [''],
        usecases: [['']],
        agreement: ['', this.agreementValidator]
      });
    } else {
      this.signupForm = this.fb.group({
        email: ['', (control) => this.emailValidator(control)],
        matchingPassword: this.fb.group({
          password: ['', (control) => this.passwordValidator(control)],
        }),
        packageName: [''],
        usecases: [['']],
        agreement: ['', this.agreementValidator]
      });
    }
  }

  ngOnChanges() {
    if(this.packageName) {
      this.signupForm && this.signupForm.get('packageName').setValue(this.packageName)
    }
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

  passwordValidator(control) {
    if (control.value === "") {
      this.passwordValidationMessage = "Please provide a password";
      return {
        validationError: "Empty Password"
      }
    } else if (control.value.length < 8) {
      this.passwordValidationMessage = "Password must be atleast 8 characters";
      return {
        validationError: "Password less than 8 characters"
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

  agreementValidator(control) {
    console.log(control.value, "agreement")
  }

  sendClearbitEvent(email: string) {
    let _window: any = () => {
      // return the global native browser window object
      return window;
    };
    _window().clearbitSlack && _window().clearbitSlack.notify({email: email});
  }

  onSubmit() {
    if(this.loading) return false;
    this.loading = true;
    this.message = '';
    this.error = null;
    if (!this.signupForm.valid) {
      this.signupForm.markAsTouched();
      this.loading = false;
      this.error = true;
    } else if(this.signupForm.valid) {
      let url = 'app/v1/signup/';
      let timezone =  jstz.determine();
      let user: {
        email: string,
        password: string,
        package_name: string,
        app_platform: string,
        signup_referral: string,
        signup_location: string,
        timezone: string
        agreement_type: string,
        redirect_url?: string,
        account_id?: string,
        landing_url: string,
        test_account_id?: string
      } = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.matchingPassword.password,
        package_name: this.signupForm.value.packageName,
        app_platform: this.appPlatform,
        signup_referral: this.signupService.getSignupReferral(),
        signup_location: this.signupService.getSignUpPageURL(),
        landing_url: this.signupService.getSignupLandingPage(),
        timezone: timezone.name(),
        agreement_type: "saas-06282017"
      };
      user = this.toRedirect ? user : {...user, redirect_url: location.href};
      if ( this.invitedAccountId ) {
        url = "app/v1/accounts/accept_invite/";
        user = {...user, account_id: this.invitedAccountId, email: this.route.snapshot.params['email']}
      }
      if (this.testAccountId) {
        user = {
          ...user,
          test_account_id: this.testAccountId
        }
      }
      if (this.redirectUrl) {
        user = {
          ...user,
          redirect_url: this.redirectUrl
        }
      }
      let options = AuthLessReqOptions();

      // let url = this.noEmail ? 'sign-up/in-house' : 'signup';
      this.http.post(url, user, options).subscribe(data => {
        this.sendClearbitEvent(user.email);
        this.externalAnalyticsService.logSegmentEvent( "signup", "conversion", "signup", {
          email : user.email,
          signupSource : "dashboard signup",
          signup_referral: user.signup_referral || 'Direct',
          landing_url: user.landing_url || '--',
        });

        if(this.toRedirect) {
          // location.href = '/app/verify/' + data.id
        } else {
          this.broadcast.emit('signup-form-submit');
          // this.snackbarService.displaySuccessToast('Please check you email for verification link')
        }
        this.onFormSubmit.emit(data);
        if(this.invitedAccountId) {
         location.href = `/login`;
        }
        this.isSubmitted = true
      }, (error) => {
        this.error = error;
        this.loading = false;
        this.externalAnalyticsService.logSegmentEvent( "signup error", "interaction", "signup", {
          error : error
        });
        if (error.status == 400) {
          this.message = "This email already has an account";
        }
      })
    }
  }

}
