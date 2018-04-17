import { Injectable } from '@angular/core';
import {HtClientService, HtActionsService} from "ht-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers";
import {HtUsersService} from "ht-angular";
import {combineLatest} from "rxjs/observable/combineLatest";
import {map, take} from "rxjs/operators";
import {config} from "../config";
import { startOfToday, endOfToday } from "date-fns";
import {IUserPlaceline} from "ht-models";

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
      this.htUsersClient.placeline.segmentResetId$,
      this.htUsersClient.placeline.segmentSelectedId$,
      this.htUsersClient.placeline.id$,
      this.htUsersClient.placeline.query$,
      this.htUsersClient.placeline.data$
    ).pipe(
      take(1),
    ).subscribe((a: any[]) => {
      // console.log(a);
      let query = this.getDebugUrlQuery(a[0], a[1], a[2], a[3], a[4]);
      console.log(query);
      const keys = Object.keys(query);
      if (keys.length) {
        const baseUrl = `/debug/events`;
        const suffix = keys.reduce((string, key) => {
          return `${string};${key}=${query[key]}`
        }, "");
        var win = window.open(baseUrl + suffix, '_blank');
        if (win) {
          //Browser has allowed it to be opened
          win.focus();
        } else {
          //Browser has blocked it
          alert('Please allow popups for this website');
        }
      }
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

  private getDebugUrlQuery(resetSegmentId, selectedSegmentId, placelineId, placelineQuery, userPlaceline) {
    const activityId = resetSegmentId || selectedSegmentId;
    return {
      ...(activityId ? { activity_id: activityId} : {}),
      ...(placelineId ? { user_id: placelineId} : {}),
      ...this.getDebugQueryFromPlacelineQuery(placelineQuery, placelineId, userPlaceline)
    }
  };

  private getDebugQueryFromPlacelineQuery(placelineQuery, userId, userPlaceline: IUserPlaceline) {
    let query = {};
    if (userPlaceline && userPlaceline.placeline.length) {
      const placelineSegments = userPlaceline.placeline;
      query = {
        ...query,
        min_recorded_at: placelineSegments[0].started_at,
        max_recorded_at: placelineSegments[placelineSegments.length  -1].ended_at
      }
    } else if (userId) {
      query['min_recorded_at'] = placelineQuery['min_recorded_at'] ? placelineQuery['min_recorded_at'] : startOfToday().toISOString();
      query['max_recorded_at'] = placelineQuery['max_recorded_at'] ? placelineQuery['max_recorded_at'] : endOfToday().toISOString();
    } else {

    }
    if (placelineQuery['action_id']) query['action_id'] = placelineQuery['action_id'];

    return query
  }
}
