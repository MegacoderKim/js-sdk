import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";
import {filter, map, pluck, take, tap} from "rxjs/operators";
import {IMembership, IAccount} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {combineLatest} from "rxjs/observable/combineLatest";

@Component({
  selector: 'ht-account-users-modal',
  templateUrl: './account-users-modal.component.html',
  styleUrls: ['./account-users-modal.component.scss']
})
export class AccountUsersModalComponent implements OnInit, OnDestroy {
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  @ViewChild('search') search;
  filteredMemberhips$;
  subs = [];
  listIndex: number | null = null;
  constructor(
    private router: Router,
    private accountUsersService: AccountsService
  ) { }

  ngOnInit() {
    this.filteredMemberhips$ = combineLatest(
      this.memberships$,
      this.searchTerm$.pipe(tap(data => this.listIndex == null)),
      (memberships: IMembership[], search) => {
        return search ? memberships.filter(membership => {
          return membership.account.name.toLowerCase().includes(search.toLowerCase())
        }) : memberships;
      }
    );

    const sub = this.filteredMemberhips$.pipe(
      filter(data => !!data),
      take(1)
    ).subscribe((data) => {
      console.log("das", this.search);
      this.search.nativeElement.focus()
    });

    this.subs.push(sub)
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

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

}
