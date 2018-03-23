import {Component, OnInit} from "@angular/core";
import {AccountUsersService} from "../../account/account-users.service";
import {Observable} from "rxjs/Observable";
import {IAccount, ISubAccount, IAccountUser} from "ht-models";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {Store} from "@ngrx/store";
import * as fromRooot from "../../reducers";
import * as fromAccountUser from "../../actions/account-user";
import {IsValidUrl} from "../../../utils/validations";
import {config} from "../../config";
import {IToken} from "ht-models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.less']
})
export class UserAccountComponent implements OnInit {
  account$: Observable<IAccount>;
  subAccount$: Observable<ISubAccount>;
  showToken = [false, false];
  defaultKey = {
    secret: 'sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    publishable: 'pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  };
  label = {
    secret: 'Secret key',
    publishable: 'Publishable key'
  };
  showUpload = {

  };
  config;
  constructor(
      private accountUserService: AccountUsersService,
      private snackbarService: SnackbarService,
      private store: Store<fromRooot.State>,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.account$ = this.accountUserService.getAccount();
    this.subAccount$ = this.accountUserService.getSubAccount();
    this.config = config
  }

  updateTagline(value: string) {
    this.accountUserService.updateAccount({tagline: value}, 'tagline')
  }

  update(obj, item) {
    this.accountUserService.updateAccount(obj, item)
  }

  updateSubAccount(obj, item, data?) {
    let isInvalid = this.checkValidation(item, data);
    if(!isInvalid) {
      this.accountUserService.updateSubAccount(obj, item)
    }

  }

  updateWebhook(obj, item) {
    if(this.urlValidator(obj.webhook_url)) {
      this.updateSubAccount(obj, item)
    } else {
      this.snackbarService.displayErrorToast("Please add valid url")
    }
  }

  uploadFile(input, field: string, showKey: string) {
    this.snackbarService.displayLoadingToast();
    let formData = new FormData();
    formData.append(field, input.files[0], input.files[0].name);
    // let headers = new Headers({'Authorization': 'token '+config.token,});
    // console.log(formData);
    this.accountUserService.getSubAccount().take(1).subscribe((subAccount: ISubAccount) => {
      var xhr = new XMLHttpRequest();
      xhr.open("PATCH", `https://api.hypertrack.com/api/v1/subaccounts/${subAccount.id}/`);
      xhr.setRequestHeader("Authorization", 'token '+config.token);
      xhr.send(formData);
      xhr.onreadystatechange = (e) => {
        if(xhr.readyState === 4) {
          this.snackbarService.hideLoadingToast();
          let subAccount =  JSON.parse(xhr.response);
          this.accountUserService.getUpdatedAccountOfSubAccount(subAccount).subscribe((account: IAccount) => {
            this.showUpload[showKey] = false;
            this.store.dispatch(new fromAccountUser.PatchAccountAction(account));
            input.value = ""
          });

          // this.snackbarService.displaySuccessToast('File Uploaded')
        }
      }
    });


  }


  // uploadFileTest(input, field: string) {
  //   this.snackbarService.displayLoadingToast();
  //   let formData = new FormData();
  //   let file = input.files[0];
  //   file.name = field;
  //   formData.append(field, input.files[0], input.files[0].name);
  //   let headers = {'Content-Type': false, 'Authorization': 'token '+config.token};
  //   let patch$ = this.accountUserService.getSubAccount().take(1).flatMap((subAccount: ISubAccount) => {
  //     // return this.http.patch(`https://api.hypertrack.io/api/v1/subaccounts/${subAccount.id}/`, input.files[0], {headers})
  //     return this.http.patch(`http://core-api-staging-10939710.us-east-1.elb.amazonaws.com/api/v1/subaccounts/${subAccount.id}/`, input.files[0], {headers: headers})
  //   });
  //   patch$.subscribe((data) => {
  //     console.log(data);
  //   })
  //
  // }

  removeUpload(key, show) {
    let obj = {[key]: null};
    console.log("key", show);
    this.showUpload[show] = false
    this.updateSubAccount(obj, key);
  }

  removeShow(key, elem) {
    elem.value = ""
    this.showUpload[key] = false
  }


  updateUrl(obj, item, key) {
    if(this.urlValidator(obj[key])) {
      this.update(obj, item)
    } else {
      this.snackbarService.displayErrorToast("Please add valid url")
    }
  }

  urlValidator(url) {
    let urlRegex =  /^https?\:\/\/[^\/\s]+(\/.*)?$/ ;
    let urlExpression = new RegExp(urlRegex);
    return (urlExpression.test(url) || url == '');

  };

  hasCopied() {
    this.snackbarService.displaySuccessToast('Key was copied')
  }

  rollKey(token: IToken) {
    console.log(token);
    this.snackbarService.displayLoadingToast();
    this.accountUserService.getSubAccount().take(1)
      .withLatestFrom(this.accountUserService.getUser())
      .map(([subAccount, accountUser]: [ISubAccount, IAccountUser]) => {
        return {subAccountId: subAccount.id, email: accountUser.email}
      })
      .switchMap(({subAccountId, email}) => {
      return this.accountUserService.rollKey(subAccountId, token.scope, email)
    }).subscribe((data) => {
      console.log(data);
      this.snackbarService.hideLoadingToast();
      this.snackbarService.displaySuccessToast("Check your email to confirm key roll")
    }, err => {
      console.log(err);
      this.snackbarService.hideLoadingToast();
      this.snackbarService.displayErrorToast("Error: Contact us to resolve issue")
    })
  }

  changeFile(apnsDist, key) {
    this.showUpload[key] = apnsDist.files.length ? true : false
  }

  checkValidation(key, data) {
    let isInValid;
    let msg = "";
    if (key === 'fcm') {
      isInValid = data.length < 50 && data.length !== 0;
      msg = isInValid ? "FCM key is not correct" : ""
    }

    if(isInValid) {
      this.snackbarService.displayErrorToast(msg);
    }
    return isInValid
  }

}
