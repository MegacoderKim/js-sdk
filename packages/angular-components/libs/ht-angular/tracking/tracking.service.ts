import {Injectable} from '@angular/core';
import { IAction, ITrackAccount, Page, IActionPolyline, IActionWithPolyline, IActionMod } from "ht-models";
import {htRequestService, HtTrackingApi} from "ht-api";
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

@Injectable()
export class TrackingService {
  trackActions;
  isMapDirty: boolean = false;
  isSliding: boolean = false;
  actions$: ReplaySubject<IAction[]> = new ReplaySubject();
  error$: ReplaySubject<any | null> = new ReplaySubject<any|null>();
  pollDuration: number = 2000;
  constructor(private actionsClient: HtActionsService) {
  }


  initShortCode(shortCode: string) {
    const query = {short_code: shortCode};
    const track$ = this.fetchActionsWithTimeAwarePath(query);

    track$.pipe(
      tap((data) => {
        //loading done
      }),
      expand((data: IActionWithPolyline[]) => {
        if (data && !this.getActiveAction(data)) {
          return empty()
        } else {
          return timer(this.pollDuration).pipe(
            concatMap((_) => {
              return this.fetchActionsWithTimeAwarePath(query, data)
            })
          )
        }
      }),
      filter(data => {
        if (data) this.handleOnError(null);
        return !!data
      }),
      // map((actions: IAction[]) => actions.map(action => ({...action, display: {show_summary: false}}))),
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

  private fetchActions$(query: object): Observable<IAction[]> {
    return this.actionsClient.api.index(query).pipe(
      PageResults$,
      catchError((err) => {
        console.log("err", err);
        this.handleOnError(err);
        return of(null)
      })
    )
  };

  private fetchActionPolyline$(action): Observable<IActionPolyline> {
    return this.actionsClient.api.polyline(action.id)
  }

  private fetchActionsWithActivePolyline$(query: object, currentActions?: IActionWithPolyline[]) {
    return this.fetchActions$(query).pipe(
      concatMap((actions: IActionWithPolyline[]) => {
        if (actions) {
          actions = currentActions ? this.mergeUpdatedActions(actions, currentActions) : actions;
          const activeAction = this.getActiveAction(currentActions || actions);
          if (!activeAction || (activeAction && !activeAction.time_aware_polyline)) {
            return this.fetchActionPolyline$(actions[actions.length - 1]).pipe(
              map((actionPolyline) => {
                return this.mergeActiveActionPolyline(actionPolyline, actions)
              })
            )
          } else {
            return of(actions)
          }
        } else {
          return of(actions)
        }

      })
    )
  };

  private fetchActionsWithTimeAwarePath(query: object, currentActions?: IActionWithPolyline[]) {
    return this.fetchActionsWithActivePolyline$(query, currentActions).pipe(
      map(actions => {
        return actions ? this.fillTimeAwarePathofActions(actions) : actions
      })
    )
  }

  private fillTimeAwarePathofActions(actions: IActionWithPolyline[]) {
    return actions.map((action) => this.fillTimeAwarePath(action))
  }

  private fillTimeAwarePath(action: IActionWithPolyline): IActionMod {
    const timeAwarePath = action.timeAwarePath ?
      action.timeAwarePath : action.time_aware_polyline ?
        new TimeAwareEncoder().decodeTimeAwarePolyline(action.time_aware_polyline) : [];
    const lastPoint = timeAwarePath[timeAwarePath.length - 1];
    const lastRecordedAt = lastPoint ? new Date(lastPoint[2]).getTime() : null;
    const newPoint = action.location;
    const newRecordedAt = newPoint ? new Date(newPoint.recorded_at).getTime() : null;
    const newLocation = newPoint ? newPoint.geojson.coordinates : null;
    const appendPath = newLocation ? [[newLocation[1], newLocation[0], newPoint.recorded_at]] : [];

    if (newLocation && newRecordedAt > lastRecordedAt) {
      timeAwarePath.push(...appendPath)
    }
    action.timeAwarePath = timeAwarePath;
    return action as IActionMod
  }

  private mergeActiveActionPolyline(actonPolyline, actions: IAction[]) {
    return actions.map((action) => {
      return action.id === actonPolyline.id ? this.mergeActionAndPolyline(action, actonPolyline) : action
    })
  }

  private mergeActionAndPolyline(action, actionPolyline: IActionPolyline) {
    const timeAwarePath = new TimeAwareEncoder().decodeTimeAwarePolyline(actionPolyline.time_aware_polyline);
    return {...action, ...actionPolyline, timeAwarePath}
  }

  private mergeUpdatedActions(updatedActions, currentActions) {

    const currentActionsObject = indexBy(currentActions);
    return updatedActions.map((action) => {
      const currentAction = currentActionsObject[action.id];
      const time_aware_polyline = action.time_aware_polyline || currentAction.time_aware_polyline;
      return {...currentActionsObject[action.id], ...action, time_aware_polyline}
    })
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


  // fetchTime: number | null = null;
  // private fetchUpdatedActions$(shortCode, data, activeAction) {
  //   var currentActionsObject = data.reduce((acc, action) => {
  //     return {[action.id]: action, ...acc}
  //   }, {});
  //   const currentTime = new Date().getTime();
  //   let index$ = this.actionsClient.api.index({short_code: shortCode})
  //   if (!this.fetchTime || this.fetchTime - currentTime < 100000) {
  //     this.fetchTime = currentTime;
  //     return index$.pipe(
  //       map((newActions: Page<any>) => {
  //         return newActions.results.map((action) => {
  //           return this.updateActionWithPolyline(currentActionsObject[action.id], action)
  //         })
  //       })
  //     )
  //   } else {
  //     this.fetchTime = currentTime;
  //     return this.firstActions$(shortCode, activeAction)
  //     // index$ = index$.pipe(
  //     //   concatMap((actions) => {
  //     //     con
  //     //   })
  //     // )
  //   }
  //
  // };

  // private firstActions$(shortCode, activeAction?) {
  //   let index$ = this.actionsClient.api.index({short_code: shortCode});
  //   return index$.pipe(
  //     concatMap((actionsPage: Page<IAction>) => {
  //       activeAction = activeAction || this.getActiveAction(actionsPage.results);
  //       return this.actionsClient.api.polyline(activeAction.id).pipe(
  //         map((actionPolyline: IActionPolyline) => {
  //           return this.mergeActiveActionPolyline(actionPolyline, actionsPage.results)
  //         })
  //       );
  //
  //
  //
  //     })
  //   )
  // }

  // currentActiveAction: string | null = null;

  // private fetchActiveAction$(activeAction, allActions, shortCode: string) {
  //   if (!this.currentActiveAction || this.currentActiveAction == activeAction.id) {
  //     this.currentActiveAction = activeAction.id;
  //     return this.fetchFreshPolyline$(activeAction, allActions, shortCode)
  //   } else {
  //     this.currentActiveAction = activeAction.id;
  //     return this.fetchStalePolyline$(activeAction, allActions, shortCode)
  //   }
  // };

  // private fetchFreshPolyline$(activeAction, allActions, shortCode: string) {
  //   return this.actionsClient.api.get(activeAction.id).pipe(
  //     map((updatedActiveAction) => {
  //       return this.updateActiveActionInActions(updatedActiveAction, allActions)
  //     })
  //   )
  // }

  // private fetchStalePolyline$(activeAction, allActions, shortCode: string) {
  //   this.actionsClient.api.polyline(activeAction.id).pipe(
  //     concatMap((updatedActionPolyline: IActionPolyline) => {
  //       return this.actionsClient.api.get(activeAction.id).pipe(
  //         map(action => {
  //           return this.mergeActionAndPolyline(action, updatedActionPolyline)
  //         })
  //       )
  //     }),
  //     map((updatedActiveAction) => {
  //       return this.updateActiveActionInActions(updatedActiveAction, allActions)
  //     })
  //   )
  // }


  // private updateActiveActionInActions(updatedActiveAction, allActions) {
  //   return allActions.map((action) => {
  //     return this.updateActionWithPolyline(updatedActiveAction, action)
  //   })
  // }

  // private updateActionWithPolyline(updatedActiveAction, actionWithPolyline) {
  //   const timeAwarePath = actionWithPolyline.timeAwarePath || [];
  //   const lastPoint = timeAwarePath[timeAwarePath.length -1];
  //   const lastRecordedAt = lastPoint ? lastPoint[2] : null;
  //   const newRecordedAt = updatedActiveAction.user.last_location.recorded_at;
  //   const newLocation = updatedActiveAction.user.last_location.geojson.coordinates;
  //   const newPoint = newLocation ? [newLocation[1], newLocation[0], newRecordedAt] : null;
  //   if (!newLocation && !lastPoint) return actionWithPolyline;
  //
  //   if (!lastRecordedAt || newRecordedAt > lastRecordedAt) {
  //     // console.log("adding");
  //     return {
  //       ...actionWithPolyline,
  //       timeAwarePath: actionWithPolyline.timeAwarePath ?
  //         [...actionWithPolyline.timeAwarePath, newPoint] : [newPoint]
  //     }
  //   } else {
  //     return {...actionWithPolyline, timeAwarePath: [newPoint]}
  //   }
  // };

}
