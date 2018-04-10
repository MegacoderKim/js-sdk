import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional} from '@angular/core';
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
  query$: Observable<object | null> = of(null);
  loading$: Observable<boolean> = of(false);
  statusFiltes;
  sortingLabels;
  ordering$;
  showFilter$;
  _options = {
    showSearch: true,
    showFilter: true,
    showSorting: true,
    showDatePicker: true,
    showQueries: true
  };
  @Input() usersClient;
  @Input() set options(options) {
    this._options = {...options, ...this._options}
  }
  constructor(
    @Optional() private usersClientService: HtUsersService,
    private cd: ChangeDetectorRef
  ) {
    this.usersClient = this.usersClient || this.usersClientService
  }

  get options() {
    return this._options
  }

  ngOnInit() {

    setTimeout(() => {
      this.query$ = this.usersClient.queryLabel$;
      this.loading$ = this.usersClient.list.loading$
        .pipe(
          skip(1),
          map(data => !!data),
          distinctUntilChanged(),
        );
      this.cd.detectChanges();
    });


    this.statusFiltes = this.usersClient.filterClass.statusQueryArray;
    this.sortingLabels = this.usersClient.filterClass.sortingQueryLabel;
    this.ordering$ = this.usersClient.ordering$;
    this.showFilter$ = this.usersClient.list.id$.pipe(
      map((id) => !id ? 'hide' : 'show')
    );
  }

  onQuery(query) {
    this.usersClient.list.setQueryReset(query)
  }

  clearQuery(key) {
    this.usersClient.list.clearQueryKey(key)
  }

  setStatus(key, event) {
    this.onQuery({status: key})
  }

  closeUser() {
    this.usersClient.placeline.setId(null);
    this.usersClient.list.setId(null)
  }

  setOrdering(key, sign: 0 | 1 = 1) {
    let ordering = sign ? key : '-'+key;
    this.onQuery({ordering})
  }

}
