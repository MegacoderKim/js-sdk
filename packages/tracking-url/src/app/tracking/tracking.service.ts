import { Injectable } from '@angular/core';
const HTPublishableKey = 'pk_fe8200189bbdfd44b078bd462b08cb86174aa97c';
import {trackShortCode, IAction, ISubAccountData, ITrackingOptions, ISubAccount} from "ht-webtracking"
import {Logger} from "../logger";
import {checkUserAgent, getUserAgent, isRedirectedUrl} from '../helpers';

@Injectable()
export class TrackingService {
  trackActions;
  isMapDirty: boolean = false;
  isSliding: boolean = false;
  constructor() {

  }

  initListers() {
    this.trackActions.actions$.subscribe((actions) => {
      this.handleOnUpdate(actions);
    });

    this.trackActions.subAccountData$.subscribe((subAccountData) => {
      if (subAccountData && subAccountData.sub_account) {
        Logger.log('subAccount', subAccountData.sub_account);
        // this.handleDeepLinkRedirect(subAccountData.sub_account, action);
      }
    })
  }

  initShortCode(shortCode: string) {
    const trackingOptions = this.getTrackingOptions();
    this.trackActions = trackShortCode(shortCode, HTPublishableKey, trackingOptions);
    this.initListers()
  }

  getTrackingOptions(): ITrackingOptions {
    return {
      onError(err) {
        console.warn(err);
      },
      clientType: 'hypertrack/trct.at'
    };
  }

  handleOnReady(actions: IAction[]) {
    Logger.log('On Actions ready', actions);
  };

  handleOnUpdate(actions: IAction[]) {
    Logger.log('On Actions update', actions);
  }

  private handleDeepLinkRedirect(subAccount: ISubAccount, action: IAction) {
    const userAgent = getUserAgent();
    const iosDeepLinkUrl = subAccount.account.ios_deeplink_url;
    const androidDeepLinkUrl = subAccount.account.android_deeplink_url;
    const actionId = action ? action.id : '';
    const lookupId = action ? action.lookup_id : '';
    if (!isRedirectedUrl()
      && checkUserAgent.iOS(userAgent)
      && iosDeepLinkUrl
      && iosDeepLinkUrl !== '' && action.id)  {
      const iosIntent = iosDeepLinkUrl + '?task_id=' + action.id;
      const originalUrl = window.location.protocol + '://' + window.location.host + window.location.pathname;
      window.location.href = iosIntent;
      setTimeout(function() {
          window.location.href = originalUrl + '?redirect=true';
        },
        5000);
    } else if (!isRedirectedUrl()
      && checkUserAgent.Android(getUserAgent())
      && (checkUserAgent.Chrome(getUserAgent())
        || checkUserAgent.Firefox(getUserAgent())
      )
      && androidDeepLinkUrl
      && androidDeepLinkUrl !== '' && actionId) {
      let queryParams = '?task_id=' + actionId;
      if (lookupId) {
        queryParams = queryParams + '&order_id=' + lookupId;
      }
      const fallbackUrl = window.location.protocol + '://'
        + window.location.host + window.location.pathname + '?redirect=true';
      const androidIntent = 'intent:' + queryParams
        + '#Intent;scheme=' + androidDeepLinkUrl
        + ';S.browser_fallback_url=' + fallbackUrl + ';end';
      window.location.href = androidIntent;
    }
  }

}
