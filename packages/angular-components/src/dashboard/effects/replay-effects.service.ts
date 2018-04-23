import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import * as fromUser from "../actions/user";
import * as fromReplayReducer from "../reducers/replay";
import * as fromReplay from "../actions/replay";
import * as fromRoot from "../reducers";
import {IPlaceline, IUserPlaceline} from "ht-models";
import {Store} from "@ngrx/store";
import {UserTraceService} from "../users/user-trace.service";
import {timer} from "rxjs/observable/timer";
import {map, switchMap, take, takeUntil} from "rxjs/operators";
import {IReplayHead} from "ht-maps";

@Injectable()
export class ReplayEffectsService {
  // timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
  // timeAwareArray: ITimeAwarePoint[];
  constructor(
      private actions$: Actions,
      private store: Store<fromRoot.State>,
      // public timelineReplay: TimelineReplay,
      public userTraceService: UserTraceService
  ) { }

  @Effect()
  startReplay: Observable<any>  = this.actions$
      .ofType(fromUser.SELECT_USER_DATA).pipe(
      map((action: fromUser.SelectUserDataAction) => action.payload),
      map((userTimeline: IUserPlaceline) => {
          // this.timelineReplay.update(userTimeline.placeline, userTimeline.last_heartbeat_at);
          // this.timelinePolyline.update(userTimeline.placeline);
          // console.log(this.timelineReplay.stats);
          // console.log(this.getStats(userTimeline.placeline));
          let stats =  this.userTraceService.segmentsTrace.stats;
          return new fromReplay.StartReplayAction(stats)
        })
    );

  @Effect()
  updateReplay: Observable<any> = this.actions$
      .ofType(fromUser.UPDATE_USER_DATA).pipe(
      map((action: fromUser.UpdateUserDataAction) => action.payload),
      map((userTimeline: IUserPlaceline) => {
        // this.timelineReplay.update(userTimeline.placeline, userTimeline.last_heartbeat_at);
        // this.timelinePolyline.update(userTimeline.placeline);
        let stats =  this.userTraceService.segmentsTrace.stats;
        return new fromReplay.UpdateReplayAction(stats)
      })
    );

  @Effect()
  startTick: Observable<any> = this.actions$
      .ofType(fromReplay.START_TICK).pipe(
      switchMap(() => {
        return timer(0, 50).pipe(takeUntil(this.actions$.ofType(fromReplay.PAUSE_TICK, fromReplay.CLEAR_REPLAY, fromReplay.JUMP_TO_TIME, fromReplay.STOP_REPLAY)));
      }),
      map(() => new fromReplay.NextTickAction())
    );

  @Effect()
  nextTick: Observable<any> = this.actions$
      .ofType(fromReplay.NEXT_TICK).pipe(
      switchMap(() => this.store.select(fromRoot.getReplayState).pipe(take(1))),
      map((state: fromReplayReducer.State) => {
          let head = this.getNextHead(state);
          if(head.timePercent > 100) {
            return new fromReplay.JumpToTimeAction(0);
          } else {
            return new fromReplay.SetCurrentHeadAction(head)
          }

        })
    );

  @Effect()
  jumpToTime: Observable<any> = this.actions$
      .ofType(fromReplay.JUMP_TO_TIME).pipe(
      switchMap((action: fromReplay.JumpToTimeAction) => {
        return this.store.select(fromRoot.getReplayState).pipe(
          take(1),
          map((state: fromReplayReducer.State) => {
            // let head = {...this.getNextHead(state), timePercent: +action.payload};
            if(+action.payload > 100) {
              return new fromReplay.PauseTickAction();
            } else {
              let head = this.getHead(+action.payload);
              return new fromReplay.SetCurrentHeadAction(head)
            }

          })
        )
      })
    );

  @Effect()
  clearReplay: Observable<any> =  this.actions$
      .ofType(fromUser.CLEAR_USER).pipe(
      map(() => {
        this.userTraceService.segmentsTrace.clearTimeline();
        return new fromReplay.ClearReplayAction()
      })
    );



  //helpers

  // update(tripSegment: IPlaceline[]) {
  //   this.timeAwareArray = tripSegment.reduce((array, segment: IPlaceline) => {
  //     return segment.location_time_series ?
  //         [...array, ...this.timeAwarePolyline.decode(segment.location_time_series)] : array
  //   }, []);
  //
  // };

  // getPositioBearingnAtTime(time: string) {
  //   var position: any;
  //   var bearing
  //   let pathSegment: IPathSegment[] = this.timeAwarePolyline.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray, time);
  //   if (pathSegment && pathSegment.length > 0) {
  //     let pathBeaing = _.last(pathSegment);
  //     let point = _.last(pathBeaing.path);
  //     position = [point[0], point[1]];
  //     bearing = pathBeaing.bearing;
  //     // return [point[0], point[1]]
  //   } else {
  //     // return null
  //   }
  //   return {position, bearing}
  // }

  getDuration(startEnd): number {
    return new Date(startEnd.end).getTime() - new Date(startEnd.start).getTime()
  };

  getDistance(segments: IPlaceline[]): number {
    return segments.reduce((distance, segment: IPlaceline) => {
      return segment.distance ? distance + segment.distance : distance
    }, 0)
  }

  // private getStats(segments: IPlaceline[]) {
  //     let startEnd = this.timelinePolyline.getStartEnd();
  //     return {
  //     start: startEnd.start,
  //     end: startEnd.end,
  //     duration: this.getDuration(startEnd),
  //     distance: this.getDistance(segments),
  //     timeAwarePolylineArray: this.timelinePolyline.timeAwareArray
  //   }
  // }

  private getNextHead(state: fromReplayReducer.State): fromReplayReducer.IReplayHead {
    let timePercent = state.head ? state.head.timePercent + 0.05 * state.animationSpeed : 0;
    return this.getHead(timePercent)
  }

  private getHead(timePercent): IReplayHead {
    let stats = this.userTraceService.segmentsTrace.stats;
    let currentTimeValue = (timePercent * (stats.duration) / 100) + new Date(stats.start).getTime();
    let currentTime = new Date(currentTimeValue).toISOString();
    let positionBearing = this.userTraceService.segmentsTrace.timelineSegment.getPositionBearingnAtTime(timePercent);
    let currentPosition = positionBearing.position;
    let bearing = positionBearing.bearing;
    return {timePercent, currentTime, currentPosition, bearing}
  }

    // private getStartEnd(timeAwareArray: ITimeAwarePoint[]) {
    //     // console.log(timeAwareArray[0]);
    //     let start = timeAwareArray.length > 0 ? timeAwareArray[0][2]+'' : '';
    //   let end = timeAwareArray.length > 0 ? _.last(timeAwareArray)[2]+'' : '';
    //     return { start, end};
    //
    // }
}
