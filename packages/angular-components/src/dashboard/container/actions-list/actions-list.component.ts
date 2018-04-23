import { Component, OnInit } from '@angular/core';
import {EntityListComponent} from "../entity-list/entity-list.component";
import {ActivatedRoute} from "@angular/router";
import {BroadcastService} from "../../core/broadcast.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromAction from "../../actions/action";
import * as fromUi from "../../actions/ui";
import {IAction, IActionPage} from "ht-models";
import {ActionService} from "../../action/action.service";
import * as fromQuery from "../../actions/query";
import * as _ from "underscore";
import {IActionMap} from "ht-models";
import {Observable} from "rxjs/Observable";
import {zip} from "rxjs/observable/zip";
import {filter, map, share, skip} from "rxjs/operators";

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.less']
})
export class ActionsListComponent extends EntityListComponent implements OnInit {
  detailActionId: string | null; // used on popup active state
  detailLookupId: string | null; // used on popup active state
  selectedActionId;

  constructor(
    public route: ActivatedRoute,
    public broadcast: BroadcastService,
    public store: Store<fromRoot.State>,
    public actionService: ActionService
  ) {
    super(route, broadcast)
  }

  ngOnInit() {
    super.ngOnInit()
  }

  getDateRange() {
    return this.store.select(fromRoot.getQueryDateRange)
  }

  getQuery() {
    return this.store.select(fromRoot.getQueryActionQuery)
  }

  getListDateQuery() {
    return this.store.select(fromRoot.getQueryActionListDateQuery)
  }

  getPageQuery() {
    return this.store.select(fromRoot.getQueryActionPageQuery)
  }

  getListApi(query) {
    return this.actionService.indexOnDate(query)
  }

  getSummaryApi(query) {
    return this.actionService.overview({...query, status: null, page: null})
  }

  getPageData() {
    return this.store.select(fromRoot.getActionPageData)
  }

  updateListData(data: IActionPage) {
    this.store.dispatch(new fromAction.SetActionPageDataAction(data));
  }

  updatePageQuery(query) {
    this.store.dispatch(new fromQuery.UpdateActionPageQueryQueryAction(query))
  }

  updateSummaryData(data) {
    this.store.dispatch(new fromAction.SetActionSummary(data))
  }

  getDelayedIcon(action: IAction) {
    let eventFlags = _.map(action.event_flags, flags => {
      return flags['type'];
    });
    if(eventFlags.indexOf('action.completed_late') > -1) return 'text-warning fa-circle';
    if(eventFlags.indexOf('action.delayed') > -1) return 'text-warning fa-circle-o';
    return !!action.completed_at ? 'text-ontime fa-circle' : 'text-ontime fa-circle-o'
  }

  firstFetch$(query) {
    // return this.getListApi(query)
    return zip(
      this.getListApi(query),
      this.getSummaryApi({...query, page: null, ordering: null})
    ).pipe(
      map(([pageData, summary]) => {
        this.updateSummaryData(summary);
        return pageData
      })
    );
  }

  detailListener() {
    this.store.dispatch(new fromUi.LoadingMapUiAction(true));
    let params$ = this.route.params.map(params => {
      let id = params['id'];
      let lookupId = params['lookup_id'];
      this.detailActionId = id;
      this.detailLookupId = lookupId;
      return {id, lookupId}
    });

    let hasPopup = params$.pipe(filter((param) => param['id'] || param['lookup_id']))
      .subscribe(({id, lookupId}) => {
      if(id) {
        this.selectActionId(id)
      } else if(lookupId) {
        this.store.dispatch(new fromAction.SetActionsMapFilterAction((action: IActionMap) => false))
      }
    });
    let params = this.route.snapshot.params;

    let skipNumber = params['id'] || params['lookup_id'] ? 0 : 1;

    let hasNoPopup = params$.pipe(
      filter((param) => !(param['id'] || param['lookup_id'])),
      share(),
      skip(skipNumber)
    )
      .subscribe(() => {
        this.unselectAction()
      });

    this.subs.push(hasPopup, hasNoPopup);
  }

  selectActionId(id) {
    this.selectedActionId = id;
    this.store.dispatch(new fromAction.SetActionsMapFilterAction((action: IActionMap) => false))
  }

  unselectAction() {

  }

}
