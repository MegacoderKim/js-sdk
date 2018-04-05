import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HomePageService} from "./home-page.service";
import {ModalService} from "../services/modal.service";
let CountUp = require('countup.js');
require('../../assets/js/webflow/webflow.js');

const primitivesContent = [
  {
    "identifier": "activity",
    "label": "Activity",
    "text": "Track user activity as walks, runs, drives, bikes along with places visited",
    "icon": require('../../assets/images/primitives/activity-icon.svg'),
    "graphic": require('../../assets/images/primitives/activity-graphic.png'),
    "caption": "Know if your users are walking, driving or biking and the places that they visited",
    "status" : "inactive"
  }, {
    "identifier": "location",
    "label": "Location",
    "text": "Track accurate, real-time and battery efficient locations for your users",
    "icon": require('../../assets/images/primitives/location-icon.svg'),
    "graphic": require('../../assets/images/primitives/location-graphic.png'),
    "caption": "Get accurate, real-time, continuous and smooth animations of users on a map",
    "status" : "inactive"
  }, {
    "identifier": "device-health",
    "label": "Device Health",
    "text": "Track critical health parameters like battery drain, network and GPS outage",
    "icon": require('../../assets/images/primitives/device-health-icon.svg'),
    "graphic": require('../../assets/images/primitives/device-health-graphic.png'),
    "caption": "Keep tabs on critical health parameters like low battery, poor network and GPS outage",
    "status" : "inactive"
  }, {
    "identifier": "mileage",
    "label": "Mileage",
    "text": "Track distance and duration of trips with billing-ready accuracy",
    "icon": require('../../assets/images/primitives/mileage-icon.svg'),
    "graphic": require('../../assets/images/primitives/mileage-graphic.png'),
    "caption": "Get accurate distance and time traveled for each action",
    "status" : "inactive"
  }, {
    "identifier": "etas",
    "label": "ETA & Status",
    "text": "Get smart ETAs that factor vehicle type, user profile, and check-in/check-out time at intermediate stops",
    "icon": require('../../assets/images/primitives/etas-icon.svg'),
    "graphic": require('../../assets/images/primitives/etas-graphic.png'),
    "caption": "Get smart ETAs that factor vehicle type, user profile, and check-in/check-out time at intermediate stops",
    "status" : "active"
  }
  ];

const testimonials = [
  {
    "flag" : require('../../assets/images/flags/canada.svg'),
    "label" : "#logistics",
    "title" : "Alex Luksidadi, Rose Rocket",
    "description" : "What stood out for us was the ability to build custom visualizations for our customers by embedding HyperTrack views in our internal dashboards",
    "link" : "https://www.hypertrack.com/blog/2017/06/06/golang-order-tracking-roserocket/"
  },{
    "flag" : require('../../assets/images/flags/kenya.svg'),
    "label" : "#saas",
    "title" : "Ramogi Ochola, okHi",
    "description" : "Awesome product, detailed documentation, swift support and fun to integrate. Its a developer's dream to work with HyperTrack.",
    "link" : "https://medium.com/@letsokhi/why-we-moved-our-location-stack-to-hypertrack-c849f0526216"
  },{
    "flag" : require('../../assets/images/flags/us.svg'),
    "label" : "#emergencyservices",
    "title" : "Jason Reynolds, RescueFM",
    "description" : "With HyperTrack, we were able to set up a rescue app for large volunteer groups within a very short time.",
    "link" : "https://rescue.fm/"
  },{
    "flag" : require('../../assets/images/flags/france.svg'),
    "label" : "#services",
    "title" : "Joseph, Zeloce",
    "description" : "HyperTrack saved us hundreds of engineer hours. What we thought was going to take 1 year to build we did in 1 week with Hypertrack",
    "link" : "https://www.hypertrack.com/blog/2017/07/31/live-location-features-minutes/"
  },{
    "flag" : require('../../assets/images/flags/hungary.svg'),
    "label" : "#livelocation",
    "title" : "András Takács, P&T Ltd",
    "description" : "HyperTrack is not a black box solution which fits just one specific use-case. They have designed their product to be modular building blocks.",
    "link" : "https://www.hypertrack.com/blog/2018/01/15/how-a-c-equipment-provider-p-t-ltd-refreshed-its-delivery-experience-with-hypertrack/"
  },{
    "flag" : require('../../assets/images/flags/saudi.svg'),
    "label" : "#delivery",
    "title" : "Mohammed Sheik, TmmmT",
    "description" : "With HyperTrack, we were able to automate mileage calculations so as to bill our customers based on distance travelled",
    "link" : ""
  }
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  images = {
    zomato: require('../../assets/images/zomato.png'),
    housejoy: require('../../assets/images/housejoy.png'),
    goibibo: require('../../assets/images/goibibo.png'),
    freshdesk: require('../../assets/images/freshdesk.png'),
    delhivery: require('../../assets/images/delhivery.png'),
    pharmeasy: require('../../assets/images/pharmeasy.png'),
    okhi: require('../../assets/images/okhi_1.png'),
    redbus: require('../../assets/images/redbus.png'),
    roserocket: require('../../assets/images/roserocket.png'),
    holachef: require('../../assets/images/holachef-1.png'),
    toppr: require('../../assets/images/toppr-1.png'),
    care24: require('../../assets/images/care24-1.png'),
    cpDataIcon : require('../../assets/images/primitives/cp-data-icon.svg'),
    cpVisualIcon : require('../../assets/images/primitives/cp-visual-icon.svg'),
    cpEventsIcon : require('../../assets/images/primitives/cp-events-icon.svg'),
    androidLogoBlack : require('../../assets/images/icons/platforms/android/black.svg'),
    appleLogoBlack : require('../../assets/images/icons/platforms/iOS/black.svg'),
    xamarinLogoBlack : require('../../assets/images/icons/platforms/xamarin/black.svg'),
    cordovaLogoBlack : require('../../assets/images/icons/platforms/cordova/black.svg'),
    reactLogoBlack : require('../../assets/images/icons/platforms/react/black.svg'),
    slackLogoBlack : require('../../assets/images/icons/platforms/slack/black.svg'),
    webhooksLogoBlack : require('../../assets/images/icons/platforms/webhooks/black.svg'),
    javascriptLogoBlack : require('../../assets/images/icons/platforms/javascript/black.svg'),
    restLogoBlack : require('../../assets/images/icons/platforms/rest/black@2x.png'),
  };
  primitives = primitivesContent;
  activeIndex = 0;
  testimonials = testimonials;
  constructor(
    private homePageService: HomePageService,
    private modalService: ModalService) {}
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.homePageService.getMetrics().subscribe((metrics) => {
      let miles = (metrics && metrics.miles) ? metrics.miles : 123322;
      let hours = (metrics && metrics.hours) ? metrics.hours : 245133;
      this.liveCounter("livecounter-miles", 6000000, miles);
      this.liveCounter("livecounter-hours", 9000000, hours);
    });
  }
  onCreateAccount() {
    this.modalService.open('signupModal');
  }
  setStep( index ) {
    this.activeIndex = index;
    // primitivesContent[ index ].status="active";
  }


  liveCounter(target, startVal, endVal) {
    let easingFn = function (t, b, c, d) {
      var ts = (t /= d) * t;
      var tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    };
    let options = {
      useEasing : true,
      separator : ',',
      decimal : '.'
    };
    let demo = new CountUp(target, startVal, endVal, 0, 2.5, options);
    demo.start();
  }

}
