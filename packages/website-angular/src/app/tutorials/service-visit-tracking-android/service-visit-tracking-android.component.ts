import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');
require('../../../assets/js/external/run_prettify.js');
require("../../../assets/css/external/hemisu-light.prettify.css");
@Component({
  selector: 'app-service-visit-tracking-android',
  templateUrl: './service-visit-tracking-android.component.html',
  styleUrls: ['./service-visit-tracking-android.component.less']
})
export class ServiceVisitTrackingAndroidComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    arrow: require('../../../assets/images/arrow.svg'),
    checkmark: require('../../../assets/images/noun_946401_cc.png'),
    step1: require('../../../assets/images/Step1.png'),
    step2: require('../../../assets/images/Step2.0.png'),
    stockPhoto1: require('../../../assets/images/canstockphoto4836332.jpg'),
    stockPhoto2: require('../../../assets/images/canstockphoto41098793.jpg'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
