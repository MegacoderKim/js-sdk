import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Actions, Effect} from "@ngrx/effects";
import {BroadcastService} from "../core/broadcast.service";
import * as fromAction from "../actions/action";
import * as fromUser from "../actions/user";
import * as fromQuery from "../actions/query";
import * as fromRoot from "../reducers";
import {UserService} from "../users/user.service";
import {Store} from "@ngrx/store";
import {tap} from "rxjs/operators";

@Injectable()
export class ActionEffectsService {

    constructor(
        private actions$: Actions,
        private broadcast: BroadcastService,
        private userService: UserService,
        private store: Store<fromRoot.State>
    ) { }

    @Effect({ dispatch: false })
    updateUser$: Observable<any>  = this.actions$
        .ofType(fromAction.UPDATE_ACTION_MAP, fromAction.SET_ACTION_FILTER, fromAction.SET_ACTION_HEATMAP)  .pipe(
        tap(() => {
          this.broadcast.emit('reset-map')
        })
      );


    // @Effect()
    // clearLoadingActionPage$: Observable<any> = this.actions$
    //     .ofType(fromAction.SET_PAGE_DATA, fromUser.SELECT_USER_ID, fromUser.SELECT_USER_ACTION)
    //     .map(() => {
    //         return new fromQuery.ClearLoadingQueryAction()
    //     })

}
