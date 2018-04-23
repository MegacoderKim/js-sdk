import { Component, OnInit } from '@angular/core';
import {EntityListComponent} from "../entity-list/entity-list.component";
import {BroadcastService} from "../../core/broadcast.service";
import {ActivatedRoute} from "@angular/router";
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {UserService} from "../../users/user.service";
import {IUserAnalyticsPage, IUserListSummary} from "ht-models";
import * as fromQuery from "../../actions/query";
import * as fromUser from "../../actions/user";
import {Observable} from "rxjs/Observable";
import {zip} from "rxjs/observable/zip";
import {distinctUntilChanged, filter, map, pluck, share, skip, tap} from "rxjs/operators";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent extends EntityListComponent implements OnInit {
  showAll: boolean = false;
  selectedUserSegmentId: string | null; //to show/hide popup
  constructor(
    public route: ActivatedRoute,
    public broadcast: BroadcastService,
    public store: Store<fromRoot.State>,
    public userService: UserService
  ) {
    super(route, broadcast)
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDetailListner();
    let sub = this.getQuery().pipe(
      map((query) => !!query['show_all'] || !!query['last_location__bbox']),
      distinctUntilChanged()
    ).subscribe((showAll) => {
      this.showAll = showAll;
      this.setShowAll(showAll);
    });
    this.subs.push(sub)
  }

  setShowAll(showAll) {

  }

  getQuery() {
    return this.store.select(fromRoot.getQueryUserQuery)
  }

  getListDateQuery() {
    return this.store.select(fromRoot.getQueryUserListDateQuery)
  }

  getPageQuery() {
    return this.store.select(fromRoot.getQueryUserPageQuery)
  }

  getListApi(query) {
    return this.userService.getUserAnalytics(query)
  }

  getDateRange() {
    return this.store.select(fromRoot.getQueryDateRange)
  }

  getSummaryApi(query) {
    return this.userService.summary(query)
  }

  getPageData() {
    return this.store.select(fromRoot.getUserPageData)
  }

  updatePageQuery(query) {
    this.store.dispatch(new fromQuery.UpdateUserPageQueryQueryAction(query))
  }

  updateSummaryData(data: IUserListSummary) {
    this.store.dispatch(new fromUser.SetUserSummary(data))
  }

  updateListData(data: IUserAnalyticsPage) {
    this.store.dispatch(new fromUser.SetUserPageData(data))
  }

  updateListQuery(query) {
    this.userService.setQuery(query)
  }

  firstFetch$(query) {
    // return this.getListApi(query)
    return zip(
      this.getListApi(query),
      this.getSummaryApi({...query, page: null, ordering: null})
    ).pipe(
      map(([pageData, summary]: [any, IUserListSummary]) => {
        this.updateSummaryData(summary);
        return pageData
      })
    );
  }

  initDetailListner() {
    let id$ = this.route.params.pipe(
      pluck('id'),
      tap((id: string | null) => {
        this.selectedUserSegmentId = id;
      })
    );
    let hasId = id$.pipe(filter(data => !!data)).subscribe((id: string) => {
      this.selectDetailedUser(id)
    });

    let skipNumber = this.route.snapshot.params['id'] ? 0 : 1;

    let hasNoId = id$.pipe(share(), filter(data => !data), skip(skipNumber))
      .subscribe((id: null) => {
      this.unselectDetailedUser(id)
    });

    this.subs.push(hasId, hasNoId)
  }

  selectDetailedUser(id) {

  }

  unselectDetailedUser(id) {

  }

}
