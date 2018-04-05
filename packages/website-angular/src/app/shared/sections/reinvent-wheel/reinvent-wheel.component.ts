import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reinvent-wheel',
  templateUrl: './reinvent-wheel.component.html',
  styleUrls: ['./reinvent-wheel.component.less']
})
export class ReinventWheelComponent implements OnInit {
  images = {
    demo: require('../../../../assets/images/demo.svg'),
    how: require('../../../../assets/images/how.svg'),
    animatedGroup: require('../../../../assets/images/Group_animated-3.svg'),
    googlePlay: require('../../../../assets/images/googleplay.png'),
    appStore: require('../../../../assets/images/appStore.png'),
  };
  @Input() appType: string = 'app-for-work';
  reinventTitle = "We’ve already figured out hyper accurate, low battery consuming order&nbsp;tracking. Don’t waste precious engineering resources rebuilding it.";
  trackContent = "Track Your First Order";
  trackLink = "https://dashboard.hypertrack.com/onboarding/order-tracking";
  constructor() { }

  ngOnInit() {
    switch (this.appType) {
      case 'app-for-consumers':
        this.reinventTitle = "We’ve already figured out hyper accurate, low battery consuming way to build live location sharing in your app.";
        this.trackContent = 'Track Your First User';
        this.trackLink = "https://dashboard.hypertrack.com/onboarding/platform";
        break;
      case 'actions':
        this.reinventTitle = "Start using Actions today to build your live location feature in minutes";
        this.trackContent = 'See where your users are';
        this.trackLink = "https://dashboard.hypertrack.com/onboarding/platform";
        break;
    }
  }

}
