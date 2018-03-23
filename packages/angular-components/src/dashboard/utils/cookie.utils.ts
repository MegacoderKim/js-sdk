let Cookies = require('js-cookie');
import {environment} from '../../environments/environment';
import * as URLUtils from './url.util';

let expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export function getHyperTrackLandingURL (): string {
  return Cookies.get('ht-landing-url');
}

export function setHyperTrackLandingURL(landingURL): void {
  if (!getHyperTrackLandingURL() && landingURL) {
    Cookies.set('ht-landing-url', landingURL, {
      domain: environment.domain,
      expires: expirationTime
    });
  }
}

export function getHyperTrackReferrerURL (): string {
  return Cookies.get('ht-referrer-url');
}

export function setHyperTrackReferrerURL (referrerURL): void {
  if (!getHyperTrackReferrerURL() && referrerURL && !URLUtils.isHyperTrackDomainURL(referrerURL)) {
    Cookies.set('ht-referrer-url', referrerURL, {
      domain: environment.domain,
      expires: expirationTime
    });
  }
}
