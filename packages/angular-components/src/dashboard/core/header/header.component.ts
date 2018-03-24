import {Component, OnInit, ChangeDetectionStrategy, ViewChild, HostListener} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import {Observable} from "rxjs/Observable";
import {AccountUsersService} from "../../account/account-users.service";
import {IAccount, IMembership, IAccountUser} from "ht-models";
import {config} from "../../config";
import * as _ from "underscore";
import {MembershipsService} from "../../account/memberships.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IMember} from "ht-models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  showPopup$: Observable<boolean>;
  accountUser$: Observable<IAccountUser>;
  account$: Observable<IAccount>;
  accountName;
  account: IAccount;
  accountUser: IAccountUser;
  memberships: IMembership[];
  memberships$;
  config = config;
  hasOldSdk: boolean = false;
  entityLink$;
  currentEntity$;
  showSearch: boolean = false;
  @ViewChild('search') search;
  accSeachTerm = new BehaviorSubject('');
  filteredMemberships$;

  @HostListener('mouseleave', ['$event'])
  onMouseleave( event ) {
    this.clearSearch( event );
  };

  constructor(
      private store: Store<fromRoot.State>,
      private accountUserService: AccountUsersService,
      private membershipsService: MembershipsService
  ) {

  }

  ngOnInit() {
    this.accountUserService.checkAccountUser();
    this.showPopup$ = this.store.select(fromRoot.getUiShowPopup);
    this.accountUser$ = this.accountUserService.getUser();
    this.account$ = this.accountUserService.getAccount();
    this.memberships$ = this.membershipsService.getMembershipsState();
    this.filteredMemberships$ = Observable.combineLatest(
      this.memberships$,
      this.accSeachTerm,
      (memberships: IMembership[], search: string | undefined) => {
        return search ? _.filter(memberships, (membership) => {
          return this.getMembersName(membership).toLocaleLowerCase().includes(search.toLocaleLowerCase())
        }) : memberships;
      }
    );
    this.entityLink$ = this.store.select(fromRoot.getQueryView).map(state => {
      return {
        users: ['/' + state, 'users'],
        actions: ['/' + state, 'actions']
      }
    });
    this.memberships$.subscribe((memberships) => {
      this.memberships = memberships;
    });
    this.currentEntity$ = this.store.select(fromRoot.getQueryEntity);
    this.accountUser$.subscribe((accountUser: IAccountUser) => {
      this.accountUser = accountUser;
    });
    this.account$.subscribe((account: IAccount) => {
      this.account = account;
      this.accountName = account ? account.name : "";
    })
  }

  getMembersName(member: IMembership) {
    // let matchMember
    const matchMember: IMember = member.account.members.find((member: IMember) => member.role === 'owner');
    // return member.account.name
    return !matchMember || member.account.name != 'Unnamed account' ? member.account.name : matchMember.user.email;
  }

  isReadOnlyMembership(): boolean {
    let accountUser = this.accountUser;
    let account = this.account;
    let memberships = this.memberships;
    //todo fix this for account
    // if (account) {
    //   let membership = _.find(memberships, (member: IMembership) => {
    //     return (member.account.id === account.id);
    //   });
    //   return membership ? membership.role === 'read_only' : false;
    // }
    return false;
  };

  setTokenType(type) {
    this.accountUserService.setTokenType(type)
  }

  toggleEnv() {
    if(config.tokenType != 'production') {
      this.setTokenType('production')
    } else {
      this.setTokenType('test')
    }
  }

  selectAccount(account: IAccount) {
    this.accountUser$.take(1).subscribe((accountUser: IAccountUser) => {
      this.accountUserService.setAccount(account, accountUser);
    });
  }

  selectDefaultAccount() {
    this.accountUser$.take(1).subscribe((accountUser: IAccountUser) => {
      this.accountUserService.setAccount(accountUser.default_account, accountUser)
    })
  }

  searchAccount(ele) {
    // console.log(ele.value);
    this.accSeachTerm.next(ele.value)
  }

  signup() {
    this.accountUserService.logout(false);
    location.href = "https://www.hypertrack.com/signup"
  }

  logout() {
    this.accountUserService.logout()
  }

  setShowSearch(elem) {

    this.showSearch = true;
    setTimeout(() => {
      elem.focus();
    });

  }

  clearSearch( event ) {
    this.showSearch = false;
    this.accSeachTerm.next('');
    event.stopPropagation();
  }

}
