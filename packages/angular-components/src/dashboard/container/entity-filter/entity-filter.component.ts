import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {IPageData} from "../../model/common";
import {UserService} from "../../users/user.service";
import {ActionService} from "../../action/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as fromQuery from "../../actions/query";
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {empty} from "rxjs/observable/empty";

@Component({
  selector: 'app-entity-filter',
  templateUrl: './entity-filter.component.html',
  styleUrls: ['./entity-filter.component.less']
})
export class EntityFilterComponent implements OnInit {
  @Input() entity: string = "";
  @Input() searchApi$: (object) => Observable<IPageData> = (a) => empty();
  @Input() small: boolean = false;
  query$: Subject<string> = new Subject();
  loading;
  showResults: boolean = false;
  results;
  constructor(
      public userService: UserService,
      public actionService: ActionService,
      public route: ActivatedRoute,
      public router: Router,
      public store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    // this.watchChange()
  }

  test(string) {
    this.query$.next(string)
  }

  private watchChange() {
    this.query$.debounceTime(400)
        .do(term => {
          if(term.length > 1) {
            // this.showResults = true;
          } else {
            this.clearData()
          }
        })
        .switchMap(term => {
          return this.searchApi({search: term, page_size: 3})
        })
        .subscribe(searchData => {
          console.log(searchData, "data");
          this.results = searchData;
        })
  }

  searchApi(query) {
    if(this.entity && this.entity == 'users') {
      return this.userService.summary(query)
    } else {
      return this.actionService.summary(query)
    }
  }

  setSearch(el) {
    let term = el.value;
    el.value = '';
    if(this.entity && this.entity == 'users') {
      this.store.dispatch(new fromQuery.UpdateUserListQueryQueryAction({search: term}));
    } else {
      this.store.dispatch(new fromQuery.UpdateActionListQueryQueryAction({search: term}));
    }
    // this.router.navigate(['/'], {queryParams: {search: term}, relativeTo: this.route})

  }

  private clearData() {
    this.showResults = false;
  }
}
