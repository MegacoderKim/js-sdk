import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import * as $ from 'jquery';
import {ActivatedRoute} from "@angular/router";

require('../../assets/js/webflow/webflow.js');
const allPlatforms = [{
  "name" : "Android",
  "text" : "5 Steps | 12 lines of code",
  "iconCode" : "fa-android",
  "link": "https://www.hypertrack.com/docs/quickstart/android"
}, {
  "name" : "iOS",
  "text" : "5 Steps | 15 lines of code",
  "iconCode" : "fa-apple",
  "link": "https://www.hypertrack.com/docs/quickstart/ios"
}, {
  "name" : "React Native",
  "text" : "6 Steps | 11 lines of code",
  "iconImage" : require('../../assets/images/hyperstart/react.svg'),
  "link": "https://www.hypertrack.com/docs/quickstart/reactnative"
}, {
  "name" : "Cordova",
  "text" : "5 Steps | 12 lines of code",
  "iconImage" : require('../../assets/images/hyperstart/cordova.svg'),
  "link": "https://docs.hypertrack.com/sdks/cordova/setup.html"
}, {
  "name" : "Ionic Framework",
  "text" : "5 Steps | 10 lines of code",
  "iconImage" : require('../../assets/images/hyperstart/ionicLogo.png'),
  "link": "https://ionicframework.com/docs/native/hypertrack/"
}, {
  "name" : "Xamarin",
  "text" : "5 Steps | 11 lines of code",
  "iconImage" : require('../../assets/images/hyperstart/xamarin.svg'),
  "link": "https://docs.hypertrack.com/sdks/xamarin/setup.html "
}];

const allGuides = [{
  "name" : "Get current location",
  "text" : "Get information about the user's movement and location.",
  "image" : require( "../../assets/images/guide1.png"),
  "link": "https://docs.hypertrack.com/gettingstarted/location.html"
}, {
  "name" : "Get location and activity history",
  "text" : "Get your users location, activity and health data via API",
  "image" : require( "../../assets/images/guide2.png"),
  "link": "https://docs.hypertrack.com/gettingstarted/activities.html"
}, {
  "name" : "Get route travelled",
  "text" : "Get users' time aware polyline showing the route travelled",
  "image" : require( '../../assets/images/guide3.png'),
  "link": "https://docs.hypertrack.com/gettingstarted/route.html"
}, {
  "image" : require( '../../assets/images/guide6.png'),
  "name" : "Get ETA & Status",
  "text" : "Get ETA & Status for actions",
  "link": "https://docs.hypertrack.com/api/entities/action.html#the-action-object"
}, {
  "image" : require( '../../assets/images/guide5.png'),
  "name" : "Get mileage",
  "text" : "Get accurate distance travelled and time elapsed for a trip",
  "link": "https://docs.hypertrack.com/api/entities/action.html#meter-an-action"
}, {
  "image" : require( '../../assets/images/guide4.png'),
  "name" : "Setup Slack alerts",
  "text" : "Get realtime alerts with contextual data in your Slack channels",
  "link": "https://docs.hypertrack.com/events/slack.html"
},{
  "image" : require( '../../assets/images/guide4.png'),
  "name" : "Consume events via webhooks",
  "text" : "Get events in realtime via webhooks to build your business flow",
  "link": "https://docs.hypertrack.com/events/webhook.html"
},{
  "image" : require( '../../assets/images/guide4.png'),
  "name" : "Build your own dashboard",
  "text" : "Build your own dashboard from scratch using our JS libraries",
  "link": "https://docs.hypertrack.com/js-sdk/"
}];

const allTutorials = [{
  "image" : "https://s3.amazonaws.com/wordpress-blog-images/wp-content/uploads/2017/08/uber-hypertrack.png",
  "title" : "Build Uber-for-X within a day using HyperTrack",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/blog/2017/08/24/build-uber-for-x-hypertrack/"
}, {
  "image" : "https://d1tpfxb1pip2g6.cloudfront.net/v1/2017/09/placeline.jpg",
  "title" : "Build live location sharing in your Android messaging app",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/tutorials/live-location-sharing-android-messaging-app"
}, {
  "image" : "https://dalc1wjncfbgm.cloudfront.net/canstockphoto4836332.ac677b49cafc05cb3318.jpg",
  "title" : "Build location tracking of at-home service visits in Android",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/tutorials/service-visit-tracking-android"
}, {
  "image" : "https://d1tpfxb1pip2g6.cloudfront.net/v1/2017/09/Microsoft-1200x600.jpg",
  "title" : "Automate travel reimbursements in your app within minutes",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/blog/2017/09/19/automate-travel-reimbursements-in-your-app/"
}, {
  "image" : "https://i0.wp.com/blog.hypertrack.com/wp-content/uploads/2017/06/Screen-Shot-2017-06-01-at-7.55.48-PM-1024x628.png?fit=696%2C427&ssl=1",
  "title" : "Get Slack alerts for business-as-usual location events",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/blog/2017/06/07/business-as-usual-events-slack/"
}, {
  "image" : "https://blog.hypertrack.com/wp-content/uploads/2017/06/HT-Slack.png",
  "title" : "Get Slack alerts for unexpected events on the field",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/blog/2017/06/01/unexpected-events-slack-alerts/"
}, {
  "image" : "https://d1tpfxb1pip2g6.cloudfront.net/v1/2017/10/firebaseblog.png",
  "title" : "Build Order Tracking with HyperTrack and Firebase",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/blog/2017/10/12/using-hypertrack-with-your-firebase-app/"
}, {
  "image" : "https://i2.wp.com/blog.hypertrack.com/wp-content/uploads/2017/05/Events.png?resize=696%2C640&ssl=1",
  "title" : "Using real-time location events to run your business",
  "text" : "This library can be used to render a map with live tracking view in any webpage.",
  "link": "https://www.hypertrack.com/blog/2017/05/31/location-based-events/"
}];

const apiReference = [
  {
    "name" : "REST API",
    "items" : [
      {
        "label" : "Introduction",
        "link" : "https://docs.hypertrack.com/"
      },{
        "label" : "Actions",
        "link" : "https://docs.hypertrack.com/api/entities/action.html"
      },{
        "label" : "Rules",
        "link" : "https://docs.hypertrack.com/api/entities/rules.html"
      },{
        "label" : "Users",
        "link" : "https://docs.hypertrack.com/api/entities/user.html"
      }, {
        "label" : "Places",
        "link" : "https://docs.hypertrack.com/api/entities/place.html"
      }
    ]
  }, {
    "name" : "Mobile SDK",
    "items" : [
      {
        "label" : "Introduction",
        "link" : "https://docs.hypertrack.com/sdks/"
      }, {
        "label" : "Android",
        "link" : "https://docs.hypertrack.com/sdks/android/reference/hypertrack.html"
      }, {
        "label" : "iOS",
        "link" : "http://cocoadocs.org/docsets/HyperTrack/"
      }, {
        "label" : "React Native",
        "link" : "https://docs.hypertrack.com/sdks/reactnative/reference.html"
      }, {
        "label" : "Cordova",
        "link" : "https://docs.hypertrack.com/sdks/cordova/reference.html"
      },{
        "label" : "Xamarin",
        "link" : "https://docs.hypertrack.com/sdks/xamarin/setup.html"
      }
    ]
  }, {
    "name" : "Events",
    "items" : [
      {
        "label" : "Introduction",
        "link" : "https://docs.hypertrack.com/events/"
      }, {
        "label" : "Webhooks",
        "link" : "https://docs.hypertrack.com/events/webhook.html"
      }, {
        "label" : "Slack alerts",
        "link" : "https://docs.hypertrack.com/events/slack.html"
      }
    ]
  },{
    "name" : "Visuals",
    "items" : [
      {
        "label" : "Tracking Experience",
        "link" : "https://docs.hypertrack.com/usecases/livetracking/ios/installing.html"
      },{
        "label" : "Widgets",
        "link" : "https://docs.hypertrack.com/dashboard/widgets.html"
      }, {
        "label" : "Javascript Library",
        "link" : "https://docs.hypertrack.com/js-sdk/"
      }
    ]
  }
];

const sampleApps = [{
  "name" : "Quickstart Apps",
  "description" : "Quickstart app to plug in HyperTrack SDK and track users",
  "platforms" : [
    {
      label: "Android",
      link: "https://github.com/hypertrack/quickstart-android"
    },
    {
      label: "iOS",
      link: "https://github.com/hypertrack/quickstart-ios"
    }
  ]
}, {
  "name" : "Quickstart Apps for Action",
  "description" : "Quickstart apps to create, assign and complete Actions",
  "platforms" : [
    {
      label: "Android",
      link: "https://github.com/hypertrack/use-cases-example-android"
    },
    {
      label: "iOS",
      link: "https://github.com/hypertrack/use-cases-example-ios"
    }
  ]
}, {
  "name" : "Order Tracking Apps (driver)",
  "description" : "Sample app to build order tracking use case (driver side app)",
  "platforms" : [
    {
      label: "Android",
      link: "https://github.com/hypertrack/use-cases-example-android"
    },
    {
      label: "iOS",
      link: "https://github.com/hypertrack/use-cases-example-ios"
    }
  ]
}, {
  "name" : "Order Tracking Apps (consumer)",
  "description" : "Sample app to build order tracking use case (consumer side app)",
  "platforms" : [
    {
      label: "Android",
      link: "https://github.com/hypertrack/android-live-tracking-view"
    },
    {
      label: "iOS",
      link: "https://github.com/hypertrack/ios-live-tracking-view-swift"
    }
  ]
}, {
  "name" : "Live Location Sharing Apps",
  "description" : "Sample app to build live location sharing and activity tracking use case",
  "platforms" : [
    {
      label: "Android",
      link: "https://github.com/hypertrack/hypertrack-live-android"
    },
    {
      label: "iOS",
      link: "https://github.com/hypertrack/hypertrack-live-ios"
    }
  ]
}];

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.less']
})

export class DocsPageComponent implements OnInit {
  images = {
    liveScreenshot : require( '../../assets/images/ht-live-iphone.png'),
    slackImage : require( '../../assets/images/slack-1.png'),
    logo : require( '../../assets/images/hypertrack-logo-box-green.svg'),
    googlePlay: require('../../assets/images/googleplay.png'),
    appStore: require('../../assets/images/appStore.png'),
    quickstartIcon : require('../../assets/images/docs/quickstart.svg'),
    guidesIcon : require('../../assets/images/docs/guides.svg'),
    tutorialsIcon : require('../../assets/images/docs/tutorials.svg'),
    apiReferenceIcon : require('../../assets/images/docs/api-reference.svg'),
    sampleAppsIcon : require('../../assets/images/docs/sample-apps.svg'),
    postmanLogo : require('../../assets/images/docs/postman-logo.png'),
    actionsGuideBg : require('../../assets/images/docs/actions-guide-bg.png')
  };
  allPlatforms = allPlatforms;
  allGuides = allGuides;
  allTutorials = allTutorials;
  apiReference = apiReference;
  sampleApps = sampleApps;
  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    // this.initializeTypeformScript();
    this.route.fragment.subscribe(fragment => {
      if (fragment && document.getElementById(fragment)) {
        document.getElementById(fragment).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
      }
    });
  }

  scrollToApiReference( target ) {
    if ( document.getElementById(target) ) {
      document.getElementById(target).scrollIntoView({behavior: "smooth", inline: "nearest"})
    }
  }

  openSignupModal() {
    this.modalService.open('signupModal');
  }

  initializeTypeformScript() {
    (function() { var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName, id = "typef_orm_share", b = "https://embed.typeform.com/"; if (!gi.call(d, id)) { js = ce.call(d, "script"); js.id = id; js.src = b + "embed.js"; q = gt.call(d, "script")[0]; q.parentNode.insertBefore(js, q) } })()
  }
}

