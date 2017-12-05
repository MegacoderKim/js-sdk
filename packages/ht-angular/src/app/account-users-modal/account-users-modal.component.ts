import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";
import {filter, map, pluck} from "rxjs/operators";
import {IMembership} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {combineLatest} from "rxjs/observable/combineLatest";
import {IAccount} from "ht-models/dist/typings/account";

@Component({
  selector: 'ht-account-users-modal',
  templateUrl: './account-users-modal.component.html',
  styleUrls: ['./account-users-modal.component.scss']
})
export class AccountUsersModalComponent implements OnInit {
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  filteredMemberhips$;
  constructor(
    private router: Router,
    private accountUsersService: AccountsService
  ) { }

  ngOnInit() {
    this.filteredMemberhips$ = combineLatest(
      this.memberships$,
      this.searchTerm$,
      (memberships: IMembership[], search) => {
        return search ? memberships.filter(membership => {
          return membership.account.name.toLowerCase().includes(search.toLowerCase())
        }) : memberships;
      }
    )
  }

  close() {
    this.router.navigate([{outlets: {modal: null}}])
  }

  get memberships$() {
    return this.accountUsersService.memberships$.pipe(
      filter(data => !!data),
      pluck('results'),
    );
  };

  get accountUser$() {
    return this.accountUsersService.accountUsers$
  }

  setMembership(membership: IMembership) {
    this.accountUsersService.setMembership(membership);
    this.close();
    location.reload()
  }

  setAccount(account: IAccount) {
    this.accountUsersService.setAccount(account, false);
    this.close();
    location.reload()
  }

  searchAccount(search) {
    console.log(search.value);
    this.searchTerm$.next(search.value)
  }

}
