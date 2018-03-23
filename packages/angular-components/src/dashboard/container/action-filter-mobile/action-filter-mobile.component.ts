import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers";
import {ActionService} from "../../action/action.service";
import {ActionFilterComponent} from "../action-filter/action-filter.component";
import {anim} from "../../../utils/animations";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-action-filter-mobile',
  templateUrl: './action-filter-mobile.component.html',
  styleUrls: ['./action-filter-mobile.component.less', '../filter.less', '../mobile-filter.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    anim.slide,
    anim.slideDown
  ]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionFilterMobileComponent extends ActionFilterComponent implements OnInit {
  @Input() showFilter: boolean;
  showSearch: boolean = false;
  showOptions: boolean = false;
  constructor(
    public store: Store<fromRoot.State>,
    public actionService: ActionService,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient
  ) {
    super(store, actionService, router, route, http)
  }

  get mobileFilter$() {
    return this.filters$.map(filters => {
      return filters && filters.length ? filters : null
    })
  }

  goBack() {
    if(history) {
      history.back()
    }
  }

}
