import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HtUsersService} from "../../ht/ht-users.service";
import {distinctUntilChanged, map, skip} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  query$ = of(null);
  loading$ = of(false);
  statusFiltes;
  sortingLabels;
  ordering$;
  showFilter$;
  constructor(
    private usersClientService: HtUsersService
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.query$ = this.usersClientService.queryLabel$;
      this.loading$ = this.usersClientService.list.loading$
        .pipe(
          skip(1),
          map(data => !!data),
          distinctUntilChanged(),
        );

    })


    this.statusFiltes = this.usersClientService.filterClass.statusQueryArray;
    this.sortingLabels = this.usersClientService.filterClass.sortingQueryLabel;
    this.ordering$ = this.usersClientService.ordering$;
    this.showFilter$ = this.usersClientService.list.id$.pipe(
      map((id) => !id ? 'show' : 'hide')
    );
  }

  onQuery(query) {
    this.usersClientService.list.setQueryReset(query)
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
