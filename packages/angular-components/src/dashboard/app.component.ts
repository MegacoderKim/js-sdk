import { Component, Inject } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {config} from './config';
import {Observable} from 'rxjs/Observable';
import {DOCUMENT} from '@angular/common';
import * as CookieUtil from './utils/cookie.utils';
import {ExternalAnalyticsService} from './core/external-analytics.service';
import {HtClientService, HtRequestService} from 'ht-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app works!';
  isFirstNavigationDone = false;
  constructor(
    private router: Router,
    private externalAnalyticsService: ExternalAnalyticsService,
    private client: HtClientService,
    private request: HtRequestService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.client.token = config.token;
  }

  ngOnInit() {
    if (this.document && this.document.body) {
      const width = this.document.body.clientWidth;
      config.isMobile = width < 480
    }
    if ((config.isMobile || config.isWidget) && window ) {
      window['intercomSettings'] = {
        hide_default_launcher: true
      }
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.isFirstNavigationDone) {
          const window: any = this._window();
          const landingURL = window.location.href;
          const referrerURL = window.document.referrer;
          CookieUtil.setHyperTrackLandingURL(landingURL);
          CookieUtil.setHyperTrackReferrerURL(referrerURL);
          this.isFirstNavigationDone = true;
          this.externalAnalyticsService.logSegmentIdentify();
          if ( !config.isWidget ) {
            if (window.analytics) window.analytics.page();
          }
        } else if ( this.externalAnalyticsService.isSegmentInitialized() ) {
          const route = event.urlAfterRedirects || event.url;
          const window: any = this._window();
          if (!window || !window.analytics) return;
          if ( !config.isWidget ) {
            this.externalAnalyticsService.logSegmentIdentify();
            window.analytics.page( route );
          }
        }
      }
    });
    Observable.interval(1000).filter(
      () => {
        return this.externalAnalyticsService.isSegmentInitialized();
      }
    ).take(1).subscribe(() => {
      this.externalAnalyticsService.logSegmentIdentify();
    });
  }

  _window() {
    // return the global native browser window object
    return window;
  };

}
