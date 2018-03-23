import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../users/user.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers";
import {UserFilterComponent} from "../user-filter/user-filter.component";
import {anim} from "../../../utils/animations";
import {FitToMapService} from "../user-filter/fit-to-map.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-filter-mobile',
  templateUrl: './user-filter-mobile.component.html',
  styleUrls: [ '../user-filter/user-filter.component.less',  '../filter.less', '../mobile-filter.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    anim.slide,
    anim.slideDown
  ]
})
export class UserFilterMobileComponent extends UserFilterComponent implements OnInit {
  @Input() showFilter: boolean;
  showSearch: boolean = false;
  showOptions: boolean = false;
  // userFilters = GetUserFiltersMap;
  // userSorings = GetUserSortingMap;
  constructor(
    public store: Store<fromRoot.State>,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public fitToMap: FitToMapService
  ) {
    super(store, userService, router, route, http, fitToMap)
  }

  get mobileFilter$() {
    return this.filters$.map(filters => {
      return filters && filters.length ? filters : null
    })
  }

  goBack() {
    // this.router.navigate(['/map', 'users'], {queryParamsHandling: 'preserve'})
    if(history) {
      history.back()
    }
  }

}
