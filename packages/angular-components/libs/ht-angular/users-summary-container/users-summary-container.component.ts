import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {HtUsersService} from "../ht/ht-users.service";
import {QueryLabel} from "ht-client";

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
export class UsersSummaryContainerComponent implements OnInit, OnDestroy {
  summary$;
  @Input() queryLabels: QueryLabel[];
  @Input() hideTotal: boolean = false;
  @Input() selectable: boolean = false;
  @Input() clearDataOnDestroy: boolean = true;
  @Input() toSetActive: boolean = true;
  constructor(
    private usersClientService: HtUsersService
  ) { }

  ngOnInit() {
    if (this.toSetActive) this.usersClientService.summary.setActive();
    this.summary$ = this.usersClientService.listStatusChart$(this.queryLabels);
    // this.summary$ = this.usersClientService.summary.data$

  }

  onClearQueryKey(key) {
    this.usersClientService.list.clearQueryKey(key)
  }

  setQuery(query: object) {
    this.usersClientService.list.setQueryReset(query)
  }

  ngOnDestroy() {
    if (this.clearDataOnDestroy) this.usersClientService.summary.clearData()
  }

}
