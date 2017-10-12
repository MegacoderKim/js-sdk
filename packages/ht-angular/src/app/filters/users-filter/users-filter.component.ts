import { Component, OnInit } from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.less'],
  animations: [
    trigger('filter', [
      state('hide', style({
        display: 'none'
      })),
      transition('hide => show', [
        style({transform: 'translateX(-100px)', height: 0}),
        animate('0.3s' + ' ease-out')
      ]),
      transition('show => hide', [
        animate('0.3s' + ' ease-in', style({transform: 'translateX(-100px)', height: 0}))
      ])])
  ]
})
export class UsersFilterComponent implements OnInit {
  query$;
  loading$;
  statusFiltes;
  sortingLabels;
  ordering$;
  showFilter$;
  constructor(
    private usersClientService: HtUsersClientService
  ) { }

  ngOnInit() {
    this.query$ = this.usersClientService.queryLabel$;
    this.loading$ = this.usersClientService.list.loading$;
    this.statusFiltes = this.usersClientService.filterClass.statusQueryArray;
    this.sortingLabels = this.usersClientService.filterClass.sortingQueryLabel;
    this.ordering$ = this.usersClientService.ordering$;
    this.showFilter$ = this.usersClientService.list.id$.map((id) => !id ? 'show' : 'hide');
  }

  onQuery(query) {
    this.usersClientService.list.updateQueryResetPage(query)
  }

  clearQuery(key) {
    this.usersClientService.list.clearQueryKey(key)
  }

  setStatus(key, event) {
    this.onQuery({status: key})
  }

  setOrdering(key) {
    this.onQuery({ordering: key})
  }

}
