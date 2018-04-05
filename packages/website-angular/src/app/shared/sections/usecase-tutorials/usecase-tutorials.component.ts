import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-usecase-tutorials',
  templateUrl: './usecase-tutorials.component.html',
  styleUrls: ['./usecase-tutorials.component.less']
})
export class UsecaseTutorialsComponent implements OnInit {
  images = {
    stockPhoto: require('../../../../assets/images/canstockphoto4836332.jpg'),
    stockPhoto2: require('../../../../assets/images/canstockphoto41098793.jpg'),
    dashboard: require('../../../../assets/images/dashboard1.jpg'),
    liveLocationStockPhoto1: require('../../../../assets/images/canstockphoto14679514.jpg'),
    liveLocationStockPhoto2: require('../../../../assets/images/canstockphoto39703909.jpg'),
  };
  @Input() appType: string = 'app-for-work';
  tutorials = [
    {
      image: this.images.stockPhoto,
      content: 'Build order tracking for service visits in Android',
      link: 'https://www.hypertrack.com/tutorials/service-visit-tracking-android',
      sizes: '(max-width: 479px) 100vw, 310px'
    },
    {
      image: this.images.stockPhoto2,
      content: 'Get Slack alerts for unexpected delay events',
      link: 'https://www.hypertrack.com/blog/2017/06/01/unexpected-events-slack-alerts/',
      sizes: '(max-width: 479px) 100vw, 157px'
    },
    {
      image: this.images.dashboard,
      content: 'Use heatmaps to figure out where your orders are getting delayed',
      link: 'https://www.hypertrack.com/blog/2017/06/01/heatmap-views/',
      sizes: '(max-width: 479px) 100vw, 310px'
    }
  ];
  constructor() { }

  ngOnInit() {
    switch (this.appType) {
      case 'app-for-consumers':
        this.tutorials = [
          {
            image: this.images.liveLocationStockPhoto1,
            content: 'Build live location sharing for your messaging app in Android',
            link: 'https://www.hypertrack.com/tutorials/live-location-sharing-android-messaging-app',
            sizes: '(max-width: 479px) 100vw, 190px'
          },
          {
            image: this.images.liveLocationStockPhoto2,
            content: 'Build live location sharing for your marketplace in iOS',
            link: '',
            sizes: '(max-width: 479px) 100vw, 196px'
          },
        ];
        break;
    }
  }

}
