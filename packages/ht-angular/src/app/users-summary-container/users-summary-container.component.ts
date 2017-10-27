import { Component, OnInit } from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ht-users-summary-container',
  templateUrl: './users-summary-container.component.html',
  styleUrls: ['./users-summary-container.component.less'],
  animations: [
    trigger('summaryAnim', [
      transition(':enter', [
        style({transform: 'translateX(-100px) scaleY(0)', height: 0, opacity: 0}),
        animate('0.3s' + ' ease-out')
      ]),
      transition(':leave', [
        animate('0.3s' + ' ease-in', style({transform: 'translateX(-100px)', height: 0, opacity: 0}))
      ])])
  ]
})
export class UsersSummaryContainerComponent implements OnInit {
  summary$;
  constructor(
    private usersClientService: HtUsersClientService
  ) { }

  ngOnInit() {
    this.usersClientService.summary.setActive();
    this.summary$ = this.usersClientService.listStatusChart$();
    // this.summary$ = this.usersClientService.summary.data$

  }

  onClearQueryKey(key) {
    this.usersClientService.list.clearQueryKey(key)
  }

  setQuery(query: object) {
    this.usersClientService.list.updateQueryResetPage(query)
  }

}
