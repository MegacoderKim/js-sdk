import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-mileage-tracking',
  templateUrl: './mileage-tracking.component.html',
  styleUrls: ['./mileage-tracking.component.less']
})
export class MileageTrackingComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    cshousejoy: require('../../../assets/images/cshousejoy.png'),
    cspharmeasy: require('../../../assets/images/cspharmeasy.png'),
    csredbus: require('../../../assets/images/csredbus.png'),
    stockPhoto1: require('../../../assets/images/canstockphoto8350702.jpg'),
    stockPhoto2: require('../../../assets/images/canstockphoto4836332.jpg'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
