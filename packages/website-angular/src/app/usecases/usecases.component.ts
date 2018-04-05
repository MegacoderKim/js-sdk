import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";

const navigation = [{
  "title" : "Order Tracking",
  "id" : "order-tracking",
  "image" : require('../../assets/images/usecases/nav-order-tracking.png'),
  "layout" : "top"
}, {
  "title" : "Live Location Sharing",
  "id" : "location-sharing",
  "image" : require('../../assets/images/usecases/nav-live-location-sharing.png'),
  "layout" : "bottom"
}, {
  "title" : "Mileage Tracking",
  "id" : "mileage-tracking",
  "image" : require('../../assets/images/usecases/nav-mileage-tracking.png'),
  "layout" : "top"
}, {
  "title" : "Geofencing",
  "id" : "geofencing",
  "image" : require('../../assets/images/usecases/nav-geofencing.png'),
  "layout" : "bottom"
}, {
  "title" : "Operations Monitoring",
  "id" : "operations-monitoring",
  "image" : require('../../assets/images/usecases/nav-operations-monitoring.png'),
  "layout" : "bottom"
}, {
  "title" : "Safety",
  "id" : "safety",
  "image" : require('../../assets/images/usecases/nav-safety.png'),
  "layout" : "bottom"
}, {
  "title" : "Customer Support",
  "id" : "customer-support",
  "image" : require('../../assets/images/usecases/nav-customer-support.png'),
  "layout" : "bottom"
},  {
  "title" : "Activity Tracking",
  "id" : "activity-tracking",
  "image" : require('../../assets/images/usecases/nav-activity-tracking.png'),
  "layout" : "bottom"
}];
const content = [
  {
    "title" : "Order tracking",
    "description" : "Get your customers and operations teams to track live location of their orders within your product experience. Works across web and app platforms.",
    "image" : require('../../assets/images/usecases/order-tracking.png'),
    "identifier" : "order-tracking",
    "testimonial" : {
      "title" : "“With the HyperTrack dashboard view embedded in our internal dashboard our associates get all the information they need in one single view.”",
      "cta" : "Read the case study →",
      "logo" : require('../../assets/images/usecases/testimonial-zomato-logo.svg'),
      "link" : "https://www.hypertrack.com/blog/2017/06/08/delighting-the-customer-delight-team-at-zomato/"
    }
  },{
    "title" : "Live location sharing",
    "description" : "Get your users to share live location with each other when on the way to meet up or for answering the eternal question “where are you?”",
    "image" : require('../../assets/images/usecases/location-sharing.png'),
    "identifier" : "location-sharing",
    "appShowcase" : {
      "title" : "Explore the app by yourself",
      "description" : "Our open source hypertrack live app lets you share your live location, see your daily activity and much more",
      "logo" : require('../../assets/images/usecases/ht-live-app-icon.svg')
    }
  },{
    "title" : "Mileage tracking",
    "description" : "Bill your customers accurately for actual miles covered. Automate mileage reimbursements at the end of day, week or month.",
    "image" : require('../../assets/images/usecases/mileage-tracking.png'),
    "identifier" : "mileage-tracking",
    "blog" : {
      "title" : "Build Uber-for-X",
      "description" : "Go through our step by step tutorial of building an Uber-for-X type of app using HyperTrack within a day",
      "cta" : "Read the guide →",
      "link" : "https://www.hypertrack.com/blog/2017/08/24/build-uber-for-x-hypertrack/"
    }
  },{
    "title" : "Geofencing",
    "description" : "Get alerts when users enter or exit places. Program rules on top of these events and get alerts through webhooks or Slack.",
    "image" : require('../../assets/images/usecases/geofencing.jpg'),
    "identifier" : "geofencing",
    "testimonial" : {
      "title" : "“HyperTrack enables us to geofence each delivery address which means we automatically know when the driver has reached destination.”",
      "cta" : "Read the case study →",
      "logo" : require('../../assets/images/usecases/testimonial-pt-logo.svg'),
      "link" : "https://www.hypertrack.com/blog/2018/01/15/how-a-c-equipment-provider-p-t-ltd-refreshed-its-delivery-experience-with-hypertrack/"
    }
  },{
    "title" : "Operations monitoring",
    "description" : "Get programmable alerts for location, activity and device health exceptions that happen while your users are on the move.\n",
    "image" : require('../../assets/images/usecases/operations-monitoring.png'),
    "identifier" : "operations-monitoring",
    "ctaMessage": {
      "message" : "Checkout out our live demo dashboard →",
      "link" : "http://dashboard.hypertrack.com/demo"
    }
  },{
    "title" : "Safety",
    "description" : "Add an SOS button in your app that messages loved ones with a link and lets them track the live location of user in a battery efficient way.",
    "image" : require('../../assets/images/usecases/safety.png'),
    "identifier" : "safety"
  }, {
    "title" : "Customer support",
    "description" : "Get your customer support teams to provide live location status of orders through existing dashboards that they know and love.",
    "image" : require('../../assets/images/usecases/customer-support.png'),
    "identifier" : "customer-support",
    "testimonial" : {
      "title" : "Hotline - Customer support software by freshdesk uses SmartPlug to give more information on support tickets. ",
      "cta" : "Read the case study →",
      "logo" : require('../../assets/images/usecases/testimonial-freshdesk-logo.svg'),
      "link" : "https://blog.hotline.io/hypertrack-orders-hotline-portal/"
    }
  },{
    "title" : "Activity tracking",
    "description" : "Track drives, walks, runs, bike rides and public transit trips of your users, along with places visited during the course of a day, week or month.",
    "image" : require('../../assets/images/usecases/activity-tracking.png'),
    "identifier" : "activity-tracking"
  }
];

@Component({
  selector: 'app-usecases',
  templateUrl: './usecases.component.html',
  styleUrls: ['./usecases.component.less']
})


export class UsecasesComponent implements OnInit {
  images = {
    zomatoLogo : require('../../assets/images/usecases/testimonial-zomato-logo.svg'),
    playStoreButton : require('../../assets/images/usecases/google-play-badge.svg'),
    appStoreButton : require('../../assets/images/usecases/appstore-badge.svg')
  };
  navigation = navigation;
  content = content;
  constructor(
    private modalService: ModalService
  ) {}
  ngOnInit() {
  }
  scrollToTarget( target ) {
    if ( document.getElementById(target) ) {
      document.getElementById(target).scrollIntoView({behavior: "smooth", inline: "nearest"})
    }
  }
  openSignupModal() {
    this.modalService.open('signupModal');
  }
}
