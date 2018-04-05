import {Component, OnInit, Inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import * as Cookie from './utils/cookie.util';
import {LoggerService} from "./services/logger.service";
import {config} from './config';
import {DOCUMENT} from '@angular/platform-browser';
import {ExternalAnalyticsService} from './services/external-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  isFirstNavigationDone: boolean = false;
  constructor(
    private router: Router,
    private logger: LoggerService,
    private externalAnalyticsService: ExternalAnalyticsService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit() {
    if (this.document && this.document.body) {
      const width = this.document.body.clientWidth;
      config.isMobile = width < 480
    }
    if (config.isMobile && window ) {
      window['intercomSettings'] = {
        hide_default_launcher: true
      }
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const window: any = this._window();
        window.scrollTo(0, 0);
        if (!this.isFirstNavigationDone) {
          let landingURL = window.location.href;
          let referrerURL = window.document.referrer;
          Cookie.setHyperTrackLandingURL(landingURL);
          Cookie.setHyperTrackReferrerURL(referrerURL);
          this.isFirstNavigationDone = true;
          this.externalAnalyticsService.logSegmentIdentify();
         } else if ( this.externalAnalyticsService.isSegmentInitialized() ) {
          const window: any = this._window();
          if (!window || !window.analytics) return;
          this.externalAnalyticsService.logSegmentIdentify();
        }
      }
    });
  }
  _window() {
    // return the global native browser window object
    return window;
  };

}
