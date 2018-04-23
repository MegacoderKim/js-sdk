import { Injectable } from '@angular/core';
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import * as fromQuery from "../actions/query";
import * as fromUser from "../actions/user";
import * as fromAction from "../actions/action";
import * as fromUi from "../actions/ui";
import {config} from "../config";
import {map, tap} from "rxjs/operators";

@Injectable()
export class LoadingEffectsService {

  constructor(
    private snackbarService: SnackbarService,
    private actions$: Actions,
  ) { }

  @Effect({ dispatch: false })
  showLoading$: Observable<any> = this.actions$
    .ofType(
      fromQuery.CHANGE_DATE_RANGE,
      fromQuery.UPDATE_DATE_RANGE,

      // fromQuery.CHANGE_VIEW,
      // fromQuery.CHANGE_ENTITY,

      fromQuery.UPDATE_ACTION_LIST_QUERY,
      fromQuery.SET_ACTION_LIST_QUERY,
      fromQuery.UPDATE_ACTION_PAGE_QUERY,
      fromQuery.CLEAR_ACTION_QUERY_KEY,

      fromQuery.UPDATE_USER_LIST_QUERY,
      fromQuery.SET_USER_LIST_QUERY,
      fromQuery.UPDATE_USER_PAGE_QUERY,
      fromQuery.CLEAR_USER_PAGE_QUERY_KEY,
      fromQuery.CLEAR_USER_QUERY_KEY
    ).pipe(
      tap(() => {
        this.snackbarService.displayLoadingToast()
      })
    );

  @Effect({ dispatch: false })
  clearLoadingUserPage$: Observable<any> = this.actions$
    .ofType(
      fromUser.SET_PAGE_DATA,
      fromUser.SELECT_USER_ID,
      fromUser.SELECT_USER_ACTION,

      fromAction.SET_PAGE_DATA,
    ).pipe(
      tap(() => {
        this.snackbarService.hideLoadingToast()
      })
    );


  // @Effect({ dispatch: false })
  // clearDefLoadingUserPage$: Observable<any> = this.actions$
  //   .ofType(fromUser.SET_PAGE_DATA, fromAction.SET_PAGE_DATA)
  //   .do(() => {
  //     this.snackbarService.hideLoadingToastList()
  //   });

  // @Effect({ dispatch: false })
  // clearLoadingUserMap$: Observable<any> = this.actions$
  //   .ofType(
  //     fromUser.UPDATE_USERS_MAP,
  //     fromUser.UPDATE_USER_PLACE,
  //
  //     fromAction.UPDATE_ACTION_HEATMAP,
  //     fromAction.UPDATE_ACTION_MAP,
  //   )
  //   .filter(() => config.isMobile)
  //   .do(() => {
  //     this.snackbarService.hideLoadingToastMobile()
  //   });

  @Effect()
  loadingMap$: Observable<any> = this.actions$
    .ofType(
      fromUser.SELECT_USER_ACTION,
      fromUser.SELECT_USER_ID,

      fromQuery.UPDATE_DATE_RANGE,
      fromQuery.CHANGE_DATE_RANGE,
      // fromUser.SELECT_TIMELINE_QUERY,
    ).pipe(
      map((action) => {
        return new fromUi.LoadingMapUiAction(true)
      })
    );

  @Effect()
  unloadingMap$: Observable<any> = this.actions$
    .ofType(
      fromUser.SELECT_USER_DATA,
      fromUser.UPDATE_USER_DATA,
      fromUser.CLEAR_USER,
      fromUser.SET_SELECTED_USER_PLACE,
      // fromUser.UPDATE_USERS_MAP,
      // fromUser.SET_USER_PLACE,
      // fromUser.UPDATE_USER_PLACE,

      // fromAction.UPDATE_ACTION_HEATMAP,
      // fromAction.SET_ACTION_HEATMAP,
      // fromAction.UPDATE_ACTION_MAP,
    ).pipe(
      map((action) => {
        return new fromUi.LoadingMapUiAction(false)
      })
    );



}
