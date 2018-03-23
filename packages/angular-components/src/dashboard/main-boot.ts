import {config} from "./config";
import {GetToken, GetAdminToken, GetReadOnlyToken} from "../utils/get-token";
import {environment} from "../environments/environment";
import {GetUrlParam} from "../utils/getUrlParam";
let Cookies = require("js-cookie");
import * as jstz from "jstz";
declare const Raven: any;
declare const ga: any;
declare const analytics: any;
declare const amplitude: any;
declare const window: any;
export function mainBoot () {
  if (environment.production) {
    Cookies.remove(`tokenType`);
    Cookies.remove(`userId`);
    Cookies.remove(`isDemo`);
    Cookies.remove(`new-user`);
  }
  Cookies.remove('ht-token');
  Cookies.remove(`ht-admin-token`);

  Cookies.remove(`ht-referrer-url`);
  Cookies.remove(`ht-landing-url`);

  let timezone =  jstz.determine();
  config.isReadOnly = !!Cookies.get('ht-readonly-token');
  config.token = GetToken();
  config.adminToken = GetAdminToken();
  config.readOnlyToken = GetReadOnlyToken();
  config.tokenType = Cookies.get('tokenType') || 'production';
  config.userId = Cookies.get('userId');
  config.isDemo = Cookies.get('isDemo');
  config.isStaff = Cookies.get('staff-user') == 'true';
  config.isNew = Cookies.get('new-user');
  config.timezone = Cookies.get('timezone');
  config.screenshot = !!GetUrlParam('screenshot');
  config.htReferrerURL = Cookies.get('ht-referrer-url');
  config.htLandingURL = Cookies.get('ht-landing-url');
  config.placelinev2 = !!GetUrlParam('v');
  config.isWidget = document.location.pathname.includes("widget");
  config.timezone = timezone.name();
  // console.log("set widget");
  if ( environment.production && !config.isWidget && document ) {
    /* Segment Script */
    const segmentScript = document.createElement('script');
    segmentScript.innerHTML = '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";' +
      'analytics.load("gPAaeSgv8lN4RI5wZHngFIhJa67lmLh6");'+
    '}}();';
    document.head.appendChild(segmentScript);
  }
  if (environment.production && document) {
    setTimeout(() => {
      if (Raven) Raven.config('https://600df23e76d141c7b50af3e9824cd5e6@app.getsentry.com/69148').install();
      if (!config.screenshot && !config.isStaff) {
        ga('create', 'UA-73021369-1', 'auto', 'allTracker');
        ga('send', 'pageview');
        ga('allTracker.send', 'pageview');

        /*NEW GA TRACKER START*/
        ga('create', 'UA-73021369-4', 'auto');
        ga('send', 'pageview');
        /*NEW GA TRACKER END*/
        if (analytics) {
          analytics.page();
        }
      }
    }, 3000)
  }
}
