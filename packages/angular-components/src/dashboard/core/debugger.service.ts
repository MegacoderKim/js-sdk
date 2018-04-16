import { Injectable } from '@angular/core';
import {HtClientService, HtActionsService} from "ht-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers";
import {HtUsersService} from "ht-angular";
import {combineLatest} from "rxjs/observable/combineLatest";
import {map, take} from "rxjs/operators";
import {config} from "../config";

@Injectable()
export class DebuggerService {

  constructor(
    private htUsersClient: HtUsersService,
    private htActionsClient: HtActionsService,
    private store: Store<fromRoot.State>,
  ) {
    // this.open()
  }

  open() {
    if (!config.isStaff) return false;
    combineLatest(
      this.htUsersClient.placeline.setSegmentResetMapId,
      this.htUsersClient.placeline.setSegmentSelectedId,
      this.htUsersClient.placeline.id$,
      this.htUsersClient.placeline.query$
    ).pipe(
      take(1),
    ).subscribe((a) => {
      // let [resetSegmentId, selectedSegmentId, placelineId, placelineQuery] = a
      // console.log(resetSegmentId, selectedSegmentId, placelineId, placelineQuery)
      // const query = this.getDebugUrlQuery(resetSegmentId, selectedSegmentId, placelineId, placelineQuery)

      console.log(a);
      // if(!config.isStaff) return false;
      // let user_id = this.timeLine.id;
      // if(this.timeLine.placeline.length) {
      //   let min = _.first(this.timeLine.placeline)['started_at'];
      //   let max = _.last(this.timeLine.placeline)['ended_at'] || new Date().toISOString();
      //   let url = `/debug/events;user_id=${user_id};min_recorded_at=${min};max_recorded_at=${max}`;
      //   console.log(url);
      //   var win = window.open(url, '_blank');
      //   if (win) {
      //     //Browser has allowed it to be opened
      //     win.focus();
      //   } else {
      //     //Browser has blocked it
      //     alert('Please allow popups for this website');
      //   }
      //   // this.router.navigate(['/debug', 'events', {user_id, min_recorded_at: min, max_recorded_at: max}])
      // };
    })
  };

  private getDebugUrlQuery(resetSegmentId, selectedSegmentId, placelineId, placelineQuery) {
    const activityId = resetSegmentId || selectedSegmentId;
    return {
      ...(activityId ? { activity_id: activityId} : {}),
      ...(placelineId ? { user_id: placelineId} : {})
    }
  };

  private getDebugQueryFromPlacelineQuery(placelineQuery) {
    let query = {};
    if (placelineQuery['min_recorded_at']) query['min_recorded_at'] = placelineQuery['min_recorded_at']
    if (placelineQuery['max_recorded_at']) query['max_recorded_at'] = placelineQuery['max_recorded_at'];
    return query
  }
}
