import {Injectable} from '@angular/core';
import { IAction, ITrackAccount, Page, IActionWithPolyline, IActionMod } from "ht-models";
import {catchError, concatMap, expand, filter, map, tap} from "rxjs/operators";
import {timer} from "rxjs/observable/timer";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {of} from "rxjs/observable/of";
import {HtActionsService} from "../ht/ht-actions.service";
import {TimeAwareEncoder} from "time-aware-polyline";
import {empty} from "rxjs/observable/empty";
import {Observable} from "rxjs/Observable";
import {PageResults$} from "ht-data";
import { indexBy} from "ht-utility";
import { TrackingConfigService } from './tracking-config.service';

@Injectable()
export class TrackingService {
  trackActions;
  isMapDirty: boolean = false;
  isSliding: boolean = false;
  actions$: ReplaySubject<IAction[]> = new ReplaySubject();
  error$: ReplaySubject<any | null> = new ReplaySubject<any|null>();
  pollDuration: number = 2000;
  constructor(
    private actionsClient: HtActionsService,
    private config: TrackingConfigService
  ) {
  }


  initShortCode(shortCode: string) {
    const query = {short_code: shortCode};
    const trackApi = this.actionsClient.api;
    trackApi.track(query).pipe(
      tap((data) => {
        //loading done
      }),
      expand((data) => {
        return timer(2000).pipe(
          concatMap((_) => {
            return trackApi.track(query).pipe(
              catchError((err) => {
                this.handleOnError(err);
                return of(null)
              })
            )
          })
        )
      }),
      filter(data => {
        if (data) this.handleOnError(null);
        return !!data
      }),
      map((data: IAction[]) => {
        return data.map((action: IAction) => {
          return this.fillTimeAwarePath(action)
        })
      }),
      tap((data: IAction[]) => {
        this.handleOnUpdate(data);
      }),
    ).subscribe(this.actions$);

  }


  private getActiveAction(data: IActionWithPolyline[]) {
    return data.find((action) => {
      // return false;
      // return !action.display.show_summary;
      return !action.completed_at;
    })
  };

  private fillTimeAwarePath(action: IAction): IActionMod {
    const timeAwarePath = action.location_time_series ?
        new TimeAwareEncoder().decodeTimeAwarePolyline(action.location_time_series) : [];
    const lastPoint = timeAwarePath[timeAwarePath.length - 1];
    const lastRecordedAt = lastPoint ? new Date(lastPoint[2]).getTime() : null;
    const newPoint = action.location;
    const newRecordedAt = newPoint ? new Date(newPoint.recorded_at).getTime() : null;
    const newLocation = newPoint ? newPoint.geojson.coordinates : null;
    const appendPath = newLocation ? [[newLocation[1], newLocation[0], newPoint.recorded_at]] : [];
    if (newLocation && newRecordedAt > lastRecordedAt) {
      // timeAwarePath.push(...appendPath)
    }
    if (!action.location_time_series) {
      timeAwarePath.push(...appendPath)
    }
    return {...action, timeAwarePath}
  }

  handleOnReady(actions: IAction[]) {
    console.log('On Actions ready', actions);
  };

  handleOnUpdate(actions: IAction[]) {
    // console.log('On Actions update', actions);
  };

  handleOnError(err: any | null) {
    this.error$.next(err)
  }

  private handleDeepLinkRedirect(subAccount: ITrackAccount, action: IAction) {
    // const userAgent = getUserAgent();
    // const iosDeepLinkUrl = subAccount.account.ios_deeplink_url;
    // const androidDeepLinkUrl = subAccount.account.android_deeplink_url;
    // const actionId = action ? action.id : '';
    // const lookupId = action ? action.lookup_id : '';
    // if (!isRedirectedUrl()
    //   && checkUserAgent.iOS(userAgent)
    //   && iosDeepLinkUrl
    //   && iosDeepLinkUrl !== '' && action.id)  {
    //   const iosIntent = iosDeepLinkUrl + '?task_id=' + action.id;
    //   const originalUrl = window.location.protocol + '://' + window.location.host + window.location.pathname;
    //   window.location.href = iosIntent;
    //   setTimeout(function() {
    //       window.location.href = originalUrl + '?redirect=true';
    //     },
    //     5000);
    // } else if (!isRedirectedUrl()
    //   && checkUserAgent.Android(getUserAgent())
    //   && (checkUserAgent.Chrome(getUserAgent())
    //     || checkUserAgent.Firefox(getUserAgent())
    //   )
    //   && androidDeepLinkUrl
    //   && androidDeepLinkUrl !== '' && actionId) {
    //   let queryParams = '?task_id=' + actionId;
    //   if (lookupId) {
    //     queryParams = queryParams + '&order_id=' + lookupId;
    //   }
    //   const fallbackUrl = window.location.protocol + '://'
    //     + window.location.host + window.location.pathname + '?redirect=true';
    //   const androidIntent = 'intent:' + queryParams
    //     + '#Intent;scheme=' + androidDeepLinkUrl
    //     + ';S.browser_fallback_url=' + fallbackUrl + ';end';
    //   window.location.href = androidIntent;
    // }
  };

}
