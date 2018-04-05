import {environment} from '../environments/environment';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/filter";
import * as Cookie from './utils/cookie.util';
import {config} from "./config";
let Cookies = require("js-cookie");
declare const ga: any;
declare const analytics: any;

function initializeGoogleAnalytics() {
  Observable.interval(200).filter(
    () => {
      return !!ga;
    }
  ).take(1).subscribe(() => {
    /* Current GA Tracker Start */
    ga('create', 'UA-73021369-1', 'auto', 'oldTracker');
    ga('oldTracker.send', 'pageview');
    /* Current GA Tracker End */
  });
}

function initializeSegment() {
  /* Segment Script */
  const segmentScript = document.createElement('script');
  segmentScript.innerHTML = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";' +
    'analytics.load("gPAaeSgv8lN4RI5wZHngFIhJa67lmLh6");'+
    '}}();';
  document.head.appendChild(segmentScript);
}

function setupConfigFromCookie() {
  config.htLandingURL = Cookie.getHyperTrackLandingURL();
  config.htReferrerURL = Cookie.getHyperTrackReferrerURL();
}

export function mainBoot () {
  if (environment.production) {
    initializeGoogleAnalytics();
    initializeSegment();
  }
  if (environment.production && document) {
    setTimeout(() => {
      if (analytics) {
        analytics.page();
      }
    }, 3000)
  }

  setupConfigFromCookie();
}
