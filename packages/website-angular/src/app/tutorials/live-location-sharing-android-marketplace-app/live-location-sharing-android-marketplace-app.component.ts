import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');
require('../../../assets/js/external/run_prettify.js');
require("../../../assets/css/external/hemisu-light.prettify.css");
@Component({
  selector: 'app-live-location-sharing-android-marketplace-app',
  templateUrl: './live-location-sharing-android-marketplace-app.component.html',
  styleUrls: ['./live-location-sharing-android-marketplace-app.component.less']
})
export class LiveLocationSharingAndroidMarketplaceAppComponent implements OnInit {
  images = {
    getHelp: require('../../../assets/images/5.95-Get-Help.jpg'),
    getHelp3: require('../../../assets/images/5.9-Get-Help.jpg'),
    getHelp4: require('../../../assets/images/5.91-Get-Help.jpg'),
    getHelp5: require('../../../assets/images/5.92-Get-Help.jpg'),
    getHelp6: require('../../../assets/images/5.94-Get-Help.jpg'),
    getHelp2: require('../../../assets/images/5.93-Get-Help.jpg'),
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
