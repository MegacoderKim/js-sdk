import { Injectable } from '@angular/core';
const HTPublishableKey = 'pk_fe8200189bbdfd44b078bd462b08cb86174aa97c';
import { IAction, ITrackAccount } from "ht-models";
import {htRequestService, HtTrackingApi} from "ht-api";
import {catchError, concatMap, expand, filter, tap} from "rxjs/operators";
import {timer} from "rxjs/observable/timer";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {of} from "rxjs/observable/of";

@Injectable()
export class TrackingService {
  trackActions;
  isMapDirty: boolean = false;
  isSliding: boolean = false;
  trackApi;
  actions$: ReplaySubject<IAction[]> = new ReplaySubject();
  error$: ReplaySubject<any | null> = new ReplaySubject<any|null>();
  constructor() {
    this.setTrackApi()
  }

  setTrackApi() {
    const request = htRequestService.getInstance(HTPublishableKey);
    request.setClientType('hypertrack/trct.at');
    this.trackApi = new HtTrackingApi(request)
  }

  initShortCode(shortCode: string) {
    this.trackApi.track(shortCode).pipe(
      tap((data) => {
        //loading done
      }),
      expand((data) => {
        return timer(2000).pipe(
          concatMap((_) => {
            return this.trackApi.track(shortCode).pipe(
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
      tap((data: IAction[]) => {
        this.handleOnUpdate(data);
      }),
    ).subscribe(this.actions$);
  }

  handleOnReady(actions: IAction[]) {
    console.log('On Actions ready', actions);
  };

  handleOnUpdate(actions: IAction[]) {
    console.log('On Actions update', actions);
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
  }

}
