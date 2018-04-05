import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');
require('../../../assets/js/external/run_prettify.js');
require("../../../assets/css/external/hemisu-light.prettify.css");
@Component({
  selector: 'app-apps-for-work',
  templateUrl: './apps-for-work.component.html',
  styleUrls: ['./apps-for-work.component.less']
})
export class AppsForWorkComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    group2: require('../../../assets/images/Group-2.png'),
    trackingExperience: require('../../../assets/images/tracking_experience.png'),
    arrow: require('../../../assets/images/arrow.svg'),
    checkmark: require('../../../assets/images/noun_946401_cc.png'),
    step1: require('../../../assets/images/Step1.png'),
    step2: require('../../../assets/images/Step2.0.png'),
    shareLiveLocation: require('../../../assets/images/sharelivelocation.jpg'),
    screenshot1: require('../../../assets/images/Screenshot-2017-08-20-16.05.25.png'),
    screenshot2: require('../../../assets/images/Screenshot-2017-08-20-16.52.48.png'),
    screenshot3: require('../../../assets/images/Screenshot-2017-08-20-16.12.47.png'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
