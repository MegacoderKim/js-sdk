import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.less']
})
export class OrderTrackingComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    cszomato: require('../../../assets/images/cszomato.png'),
    csholachef: require('../../../assets/images/csholachef.png'),
    csokhi: require('../../../assets/images/csokhi.png'),
    stockPhoto: require('../../../assets/images/canstockphoto4836332.jpg'),
    stockPhoto2: require('../../../assets/images/canstockphoto41098793.jpg'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
