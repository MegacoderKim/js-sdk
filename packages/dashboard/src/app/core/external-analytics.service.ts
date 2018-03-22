import { Injectable , Component, Inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AccountUsersService} from '../account/account-users.service';
import {IAccountUser} from 'ht-models';
import {Observable} from 'rxjs/Observable';
import * as CookieUtil from '../utils/cookie.utils';
import {config} from '../config';

@Injectable()
export class ExternalAnalyticsService {

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountUsersService,
    private router: Router
  ) { }

  logSegmentEvent( name:string, category:string, namespace: string, data?: object ) {
    var eventName = namespace + '/' + category + '/' + name;
    if ( this.getGlobalWindow().analytics ) {
      this.getGlobalWindow().analytics.track( eventName, data );
    }
  }


  getAmplitudeUserId() {
    if (this.getGlobalWindow()
      && this.getGlobalWindow().amplitude
      && this.getGlobalWindow().amplitude.options) {
      return this.getGlobalWindow().amplitude.getInstance().options.userId;
    }
    return null;
  }

  getAmplitudeDeviceId() {
    if (this.getGlobalWindow()
      && this.getGlobalWindow().amplitude
      && this.getGlobalWindow().amplitude.options) {
      return this.getGlobalWindow().amplitude.getInstance().options.deviceId;
    }
    return null;
  }

  getCurrentRouteSnapshot() {
    return this.route.snapshot.url.join();
  }
  logSegmentIdentify( eventData? ){
    const window: any = this.getGlobalWindow();
    if (!window || !window.analytics) return;
    this.getUser();
    eventData = {...eventData };
    eventData.isDemo = config ? config.isDemo : false;
    eventData.isWidget = this.router.url.startsWith('/widget');
  }

  isSegmentInitialized() {
    const window: any = this.getGlobalWindow();
    return !!(window && window.analytics && this.router);
  }

  getUser() {
    let accountUser;
    this.accountsService.getUser().filter(data => !!data).take(1).subscribe((user) => {
      accountUser = {...user};
      accountUser.name = accountUser.first_name + accountUser.last_name;
      const token = config ? config.token : 'UNKNOWN_TOKEN';
      accountUser.token = token;
      this.getGlobalWindow().analytics.identify( accountUser.email, accountUser );
    });
  }

  public getGlobalWindow(): any {
    return window;
  }
}
