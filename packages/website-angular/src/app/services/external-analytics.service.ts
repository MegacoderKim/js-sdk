import { Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Injectable()
export class ExternalAnalyticsService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  logAmplitudeEvent(eventType: string, eventProperties: any) {
    if (this.getGlobalWindow() && this.getGlobalWindow().amplitude) {
      this.getGlobalWindow().amplitude.getInstance().logEvent(eventType, {
        route: this.getCurrentRouteSnapshot(),
        ...eventProperties
      });
    }
  }

  logSegmentEvent( name: string, category: string, namespace: string, data?: object ) {
    var eventName = namespace + '/' + category + '/' + name;
    if (this.getGlobalWindow().analytics) this.getGlobalWindow().analytics.track( eventName, data );
  }

  logSegmentIdentify( eventData? ) {
    const window: any = this.getGlobalWindow();
    if (!window || !window.analytics) return;
    eventData = {...eventData };
    if ( eventData.email ) {
      window.analytics.identify(eventData.email, eventData );
    }
  }

  isSegmentInitialized() {
    const window: any = this.getGlobalWindow();
    return !!(window && window.analytics && this.router);
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

  logGAEvent(sendCommand: string, fieldTypes: GAEventFieldTypes) {
    if (this.getGlobalWindow() && this.getGlobalWindow().ga) {
      console.log( "Reached inside GA command" );
      this.getGlobalWindow().ga(sendCommand, 'event', fieldTypes);
    }
  }

  sendClearbitEvent(email: string) {
    if (this.getGlobalWindow() && this.getGlobalWindow().clearbitSlack) {
      this.getGlobalWindow().clearbitSlack.notify({email: email});
    }
  }
  getCurrentRouteSnapshot() {
    return this.route.snapshot.url.join();
  }

  public getGlobalWindow(): any {
    return window;
  }
}

export interface GAEventFieldTypes {
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
  eventData?: object;
}

