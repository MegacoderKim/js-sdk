import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-customer-stories',
  templateUrl: './customer-stories.component.html',
  styleUrls: ['./customer-stories.component.less']
})
export class CustomerStoriesComponent implements OnInit {
  images = {
    cszomato: require('../../../../assets/images/cszomato.png'),
    csholachef: require('../../../../assets/images/csholachef.png'),
    csokhi: require('../../../../assets/images/csokhi.png'),
    csecho: require('../../../../assets/images/csecho.png'),
    csredbus: require('../../../../assets/images/csredbus.png'),
    cshypertrack: require('../../../../assets/images/HTLive.png'),
  };
  @Input() appType: string = 'apps-for-work';
  customerStoriesTitle = "Read how our customers have used HyperTrack to build order tracking in their product experience and business dashboards";
  firstCustomerStory = {
    image: this.images.cszomato,
    content: 'Delighting the customer delight team at Zomato',
    link: 'https://www.hypertrack.com/blog/2017/06/08/delighting-the-customer-delight-team-at-zomato/'
  };
  secondCustomerStory = {
    image: this.images.csholachef,
    content: 'Real-time order tracking is a big boon to food-delivery services like us',
    link: 'https://www.hypertrack.com/blog/2016/06/28/holachef/'
  };
  thirdCustomerStory = {
    image: this.images.csokhi,
    content: 'Why we moved our location stack to HyperTrack',
    link: 'https://medium.com/@letsokhi/why-we-moved-our-location-stack-to-hypertrack-c849f0526216/'
  };
  constructor() { }

  ngOnInit() {
    switch (this.appType) {
      case 'app-for-consumers':
        this.customerStoriesTitle = "Read how our customers have used HyperTrack to build live location sharing and geofencing in their product experience";
        this.firstCustomerStory.image = this.images.csecho;
        this.firstCustomerStory.link = 'https://www.hypertrack.com/blog/2016/09/19/echo-tech-team-geeks-out-with-location-tracking/';
        this.firstCustomerStory.content = 'echo tech team geeks out with location tracking';

        this.secondCustomerStory.image = this.images.csredbus;
        this.secondCustomerStory.link = '';
        this.secondCustomerStory.content = 'RedBus implements live location sharing for their users';

        this.thirdCustomerStory.image = this.images.cshypertrack;
        this.thirdCustomerStory.link = 'https://www.hypertrack.com/blog/2017/08/20/hypertrack-live-placeline/';
        this.thirdCustomerStory.content = 'HyperTrack Live solves your daily anxiety of “where are you?” within seconds.';
        break;
    }
  }

}
