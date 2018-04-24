import { Component, OnInit, Input } from '@angular/core';
import {HtActionsService} from "../../ht/ht-actions.service";
import {HtUsersService} from "../../ht/ht-users.service";
import {CombineLoadings$} from "ht-data";

@Component({
  selector: 'ht-actions-filters',
  templateUrl: './actions-filters.component.html',
  styleUrls: ['./actions-filters.component.scss']
})
export class ActionsFiltersComponent implements OnInit {
  @Input() isMobile: boolean;
  datePickerOptions = {
    maxDays: 7,
    customDateRanges: ['today', 'yesterday', 'last_7_days'],
    isRight: true,
    hideCalender: this.isMobile,
  };
  query$;
  ordering$;
  statusFiltes;
  sortingLabels;
  loading$;
  constructor(
    private actionsService: HtActionsService,
    private usersService: HtUsersService
  ) { }

  ngOnInit() {
    this.query$ = this.actionsService.queryLabel$;
    this.ordering$ = this.actionsService.ordering$;
    this.statusFiltes = this.actionsService.filters.statusQueryArray;
    this.sortingLabels = this.actionsService.filters.sortingQueryLabel;
    this.loading$ = CombineLoadings$(
      this.actionsService.list.loading$,
      this.actionsService.summary.loading$,
      this.usersService.placeline.loading$
    );
  }

  onQuery(query) {
    this.actionsService.list.setQuery(query)
  }


  clearQuery(key) {
    this.actionsService.list.clearQueryKey(key)
  }

  setStatus(key, event) {
    this.onQuery({status: key})
  }

  closeAction() {
    this.usersService.placeline.setId(null);
    // this.actionsService.list.setId(null)
  }

  setOrdering(key, sign: 0 | 1 = 1) {
    let ordering = sign ? key : '-'+key;
    this.onQuery({ordering})
  }

}
