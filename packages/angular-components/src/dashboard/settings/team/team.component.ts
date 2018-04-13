import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AccountUsersService} from "../../account/account-users.service";
import {IAccount, IMember, IAccountUser, Page} from "ht-models";
import {UpdateDefaultAccount} from "../../../utils/account-user-helper";
import {config} from "../../config";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import * as _ from "underscore";
import {HttpClient} from "@angular/common/http";
import { MembershipsService } from "../../account/memberships.service";
import {zip} from "rxjs/observable/zip";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {
  account$: Observable<IAccount>;
  accountUser$: Observable<IAccountUser>;
  showAddUser: boolean = false;
  loading: boolean = false;
  removingIndex: number = -1;
  groups = [];
  isReadonly: boolean;
  constructor(
      private accountUserService: AccountUsersService,
      private membershipsService: MembershipsService,
      private snackbarService: SnackbarService,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.account$ = this.accountUserService.getAccount();
    this.membershipsService.getMembershipsState()
    .filter(data => !!data)
    .take(1)
    .withLatestFrom(
      this.account$.filter(data => !!data),
      (memberships, account) => {
        const accountId = account.id;
        const member = memberships.find((member) => {
          return member.account.id == accountId
        });
        return member.role == 'read_only';
      }
    )
    .subscribe((data) => {
      this.isReadonly = data;
    });

    this.accountUser$ = this.accountUserService.getUser();
    this.fetchGroup()
  }

  toAddUser(elem) {
    this.showAddUser = true;
    elem.value = '';
    setTimeout(() => {
      elem.focus()
    }, 100);

  }

  addAccountUser(emailElem, role, groupElem) {
    var groupId;
    if(role == 'read_only' && groupElem && groupElem.value) {
      groupId = groupElem.value;
    }
    let email = emailElem.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email), email);
    if(re.test(email) && role.length) {
      this.loading = true;
      // this.addingUser = true;
      this.accountUserService.addAccountUser(email, role, groupId).subscribe(data => {
        this.loading = false;
        // this.addingUser = false;
        this.showAddUser = false;
        // this.newUserRole = '';
        emailElem.value = '';
        console.log("new member", data);
        zip(
            this.accountUser$.take(1),
            this.account$.take(1)
        ).subscribe(([accountUser, account]) => {
          let newAccount = {...account, members: [...account.members, data]};
          let newAccountUser = UpdateDefaultAccount(accountUser, newAccount, config);
          this.accountUserService.updateAccountUser(newAccountUser)
        });
        // let members = [...this.accountService.account.members, data];
        // this.accountService.updateAccount({members: members});
        this.snackbarService.displaySuccessToast('New team member added')
      }, err => {
        this.loading = false;
        // alert("There was an error adding team member")
        if ((err.status == 401) || (err.status == 403)) {
          this.snackbarService.displayErrorToast("This action is not allowed");
        } else {
          this.snackbarService.displayErrorToast("Error adding new user")
        }
      })
    } else {
      this.snackbarService.displayErrorToast('Please enter valid email');
      // this.snackbarService.displayErrorToast('Enter a valid email and role');
      //show snackbar not a valid email
    }
  }

  resendInvite(email) {
    this.accountUserService.resendInvite(email).subscribe(data => {
      this.snackbarService.displaySuccessToast('Invite was resent')
    }, err => {
      if ((err.status == 401) || (err.status == 403)) {
        this.snackbarService.displayErrorToast("This action is not allowed");
      } else {
        this.snackbarService.displayErrorToast("Error resending invite")
      }
    })
  }

  removeMember(member: IMember, index: number) {
    let email = member.user.email;
    this.removingIndex = index;
    this.accountUserService.removeAccountUser(email).subscribe((data) => {
      this.removingIndex = -1;
      this.snackbarService.displaySuccessToast('Team member removed');
      zip(
        this.accountUser$.take(1),
        this.account$.take(1)
      ).subscribe(([accountUser, account]) => {
        let members = _.reject(account.members, (member: IMember) => {
          return member.user.email == email;
        });
        let newAccount = {...account, members};
        let newAccountUser = UpdateDefaultAccount(accountUser, newAccount, config);
        this.accountUserService.updateAccountUser(newAccountUser)
      });
    }, err => {
      this.loading = false;
      // alert("There was an error adding team member")
      if ((err.status == 401) || (err.status == 403)) {
        this.snackbarService.displayErrorToast("This action is not allowed");
      } else {
        this.snackbarService.displayErrorToast("Error removing user")
      }
    })
  }

  private fetchGroup() {
    this.http.get<Page<any>>(`app/v1/groups/?page_size=100`).subscribe((groupPage) => {
      this.groups = groupPage.results;
    })
  }
}
