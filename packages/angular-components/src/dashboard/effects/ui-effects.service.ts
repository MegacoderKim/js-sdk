import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import * as fromUser from "../actions/user";
import * as fromAction from "../actions/action";
import * as fromUi from "../actions/ui";
import {InnerMapService} from "../map-container/map.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {map, tap} from "rxjs/operators";

@Injectable()
export class UiEffectsService {

  constructor(
      private actions$: Actions,
      private mapService: InnerMapService,
      private snackbarService: SnackbarService
  ) { }

  @Effect({dispatch: false})
  mapResize$: Observable<any> = this.actions$
      .ofType(fromUi.UPDATE_MAP_MOBILE).pipe(
      map((action) => {
        this.mapService.resetSize()
      })
    );

  @Effect({dispatch: false})
  hideLoadingMap: Observable<any> = this.actions$
    .ofType(fromUser.SET_USER_PLACE, fromUser.UPDATE_USERS_MAP, fromAction.SET_ACTION_HEATMAP, fromAction.UPDATE_ACTION_MAP).pipe(
      tap(() => {
        this.snackbarService.hideLoadingToastMobile()
      })
    );


}
