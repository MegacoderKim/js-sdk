let Cookies = require('js-cookie');
import {environment} from '../../environments/environment';
import * as URLUtils from './url.util';

let domain = environment.production ? 'hypertrack.com' : 'localhost';
let expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
Cookies.defaults = {
  domain: domain,
  expires: expirationTime
};
export function getHyperTrackLandingURL (): string {
  return Cookies.get('ht-landing-url');
}

export function setHyperTrackLandingURL(landingURL): void {
  if (!getHyperTrackLandingURL() && landingURL) {
    Cookies.set('ht-landing-url', landingURL);
  }
}

export function getHyperTrackReferrerURL (): string {
  return Cookies.get('ht-referrer-url');
}

export function setHyperTrackReferrerURL (referrerURL): void {
  if (!getHyperTrackReferrerURL() && referrerURL && !URLUtils.isHyperTrackDomainURL(referrerURL)) {
    Cookies.set('ht-referrer-url', referrerURL);
  }
}
