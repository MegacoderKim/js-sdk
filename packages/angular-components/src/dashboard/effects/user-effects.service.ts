import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
// import "rxjs/add/operator/switchMap";
// import "rxjs/add/operator/do";
import {Actions, Effect} from "@ngrx/effects";
import {BroadcastService} from "../core/broadcast.service";
import * as fromUser from "../actions/user";
import * as fromUi from "../actions/ui";
import * as fromUserReducer from "../reducers/user";
import * as fromRoot from "../reducers";
import * as fromQuery from "../actions/query";
import {UserService} from "../users/user.service";
import {Store} from "@ngrx/store";
import {IRange} from "../model/common";
import {IsRangeADay} from "ht-utility";
import {UserTraceService} from "../users/user-trace.service";
import { IUserPlaceline } from "ht-models"
import {merge} from "rxjs/observable/merge";
import {combineLatest} from "rxjs/observable/combineLatest";
import {empty} from "rxjs/observable/empty";
import {of} from "rxjs/observable/of";
import {format} from "date-fns";
import {HtUsersService} from "ht-angular";
import {debounceTime, filter, map, switchMap, take, tap} from "rxjs/operators";
import {IPlaceHeat} from "ht-models";

@Injectable()
export class UserEffectsService {

    updateUserData$: Subject<boolean> = new Subject();
    // updateSub$;
    constructor(
        private actions$: Actions,
        private broadcast: BroadcastService,
        private userService: UserService,
        private htUsersService: HtUsersService,
        private store: Store<fromRoot.State>,
        private userTraceService: UserTraceService
    ) {
      this.htUsersService.placeline.data$.subscribe((user) => {
        if (user) {
          this.userTraceService.segmentsTrace.updateTimeline(user)
        } else {
          this.userTraceService.segmentsTrace.clearTimeline()
        }
      })
    }

    @Effect({ dispatch: false })
    updateUser$: Observable<any>  = this.actions$
        .ofType(fromUser.UPDATE_USERS_MAP, fromUser.SET_USER_FILTER, fromUser.SET_FILTER_USER_PLACE, fromUser.SET_USER_PLACE, fromUser.ADD_FILTER_USERS_MAP, fromUser.SET_SELECTED_USER_PLACE).pipe(
        tap(() => {
          this.broadcast.emit('reset-map')
        })
      );

    @Effect()
    fetchUserPlaces$: Observable<any>  = merge(
        this.actions$
            .ofType(fromUser.SELECT_USER_ID_PLACE),
        this.actions$.ofType(fromUser.CLEAR_SELECTED_USER_PLACE).map(() => null)
    ).pipe(
      switchMap((action) => {
        if(!action) return empty();
        return this.store.select(fromRoot.getQueryDateRange).pipe(
          switchMap((range: IRange) => {
            // console.log(range, "fire", action);
            if(IsRangeADay(range)) {
              // console.log("today", action);
              return merge(
                of(new fromUser.SelectUserIdAction(action.payload)),
                of(new fromUser.SetFilterUserPlace(() => false))
              )
            } else {
              // console.log("get place", action.payload);
              return this.userService.placeList({min_recorded_at: range.start, max_recorded_at: range.end, page_size: 10000, id: action.payload}).pipe(
                switchMap((userPlaces: IPlaceHeat[]) => {
                  return merge(
                    of(new fromUser.SetSelectedUserPlace(userPlaces)),
                    of(new fromUser.ClearUserAction())
                  )
                })
              )
            }

          })
        )
      })
    )

    // @Effect({ dispatch: false })
    // updateSegment$: Observable<any>  = this.actions$
    //     .ofType(fromUser.SELECT_SEGMENT, fromUser.CLEAR_SEGMENT)
    //     .do(() => {
    //         this.broadcast.emit('reset-map')
    //     });

    @Effect()
    selectUser$: Observable<any>  = merge(
        this.actions$.ofType(fromUser.SELECT_USER_ID, fromUser.SELECT_TIMELINE_QUERY, fromUser.SELECT_USER_ACTION).pipe(map(() => true)),
        this.updateUserData$.pipe(debounceTime(10000)),
        this.actions$.ofType(fromUser.CLEAR_USER).pipe(map(() => false))
    ).pipe(
      switchMap((toFetch) => this.getTimelineQuery(toFetch)),
      switchMap((query) => this.fetchTimeline(query)),
      filter(data => {
        return !!data
      }),
      switchMap((userSegment: IUserPlaceline) => {
        this.updateUserData$.next(true);
        // this.timelinePolyline.update(userSegment.placeline, userSegment.last_heartbeat_at);
        this.userTraceService.segmentsTrace.updateTimeline(userSegment);
        return this.store.select(fromRoot.getUserData).pipe(
          take(1),
          map((currentUserData: IUserPlaceline) => {
            if(currentUserData && currentUserData.placeline.length) {
              return new fromUser.UpdateUserDataAction(userSegment);
            } else {
              return new fromUser.SelectUserDataAction(userSegment);
            }
          })
        )
      })
    );
        // .map((userSegment: IUserPlaceline) => {
        //
        //     this.store.select(fromRoot.getUserData).take(1).subscribe((userData) => {
        //         console.log(userData, "userData");
        //     })
        //     return new fromUser.SelectUserDataAction(userSegment);
        // });


    @Effect({ dispatch: false })
    resetMapUserDataSet$: Observable<any>  = this.actions$
        .ofType(fromUser.SELECT_USER_DATA).pipe(
        tap(() => {
          this.broadcast.emit('reset-map')
        })
      );


    @Effect({ dispatch: false })
    resetMapPartialUserDataSet$: Observable<any>  = this.actions$
        .ofType(fromUser.SELECT_PARTIAL_SEGMENT, fromUser.CLEAR_PARTIAL_SEGMENT).pipe(
        tap(() => {
          this.broadcast.emit('reset-map', true)
        })
      );

    // @Effect()
    // clearUser$: Observable<any> = this.actions$
    //     .ofType(fromUser.CLEAR_USER)
    //     .map(() => {
    //         // this.updateUserData$.next(null);
    //         // return new fromUser.SelectUserIdAction(null)
    //     });

    fetchTimeline(query): Observable<IUserPlaceline | null> {
        if(query.toFetch) {
          // let getTimeline$ = (query) => this.userService.getUserTimeLine(query.userId, query.timelineQuery)
          //       .catch((err) => {
          //           if(err.status == 404) {
          //               this.broadcast.emit('user-not-found')
          //           } else {
          //               this.updateUserData$.next(query.toFetch);
          //           }
          //           return of(null)
          //       });
          return of(null)
            // return getTimeline$(query)

        } else {
            return of(null)
        }
    }

    getTimelineQuery(toFetch) {
        let queryTimeline$ = combineLatest(
            this.store.select(fromRoot.getUserState).pipe(take(1)),
            this.store.select(fromRoot.getQueryDateRange).pipe(take(1)),

        ).pipe(
          map(([userState, range]: [fromUserReducer.State, IRange]) => {
            let date = (range.end && !userState['action_id'] && !userState['action_lookup_id'] && !userState['action_collection_id'] && !userState.timelineQuery.date) ? format(range.end, 'YYYY-MM-DD') : null;
            // console.log(userState.timelineQuery, date, "query", toFetch);
            let timelineQuery = date ? {...userState.timelineQuery, date} : userState.timelineQuery;
            toFetch = toFetch && (userState.selectedUserId || userState.timelineQuery.action_id || userState.timelineQuery.action_collection_id || userState.timelineQuery.action_unique_id);
            // console.log("to fetch", toFetch, userState.timelineQuery);
            return {
              userId: userState.selectedUserId,
              timelineQuery,
              toFetch: toFetch
            }
          })
        );
        return queryTimeline$
    }

}
