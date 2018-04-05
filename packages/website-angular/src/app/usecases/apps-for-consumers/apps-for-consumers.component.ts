import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');
require('../../../assets/js/external/run_prettify.js');
require("../../../assets/css/external/hemisu-light.prettify.css");

@Component({
  selector: 'app-apps-for-consumers',
  templateUrl: './apps-for-consumers.component.html',
  styleUrls: ['./apps-for-consumers.component.less']
})
export class AppsForConsumersComponent implements OnInit {
  images = {
    getHelp: require('../../../assets/images/5.95-Get-Help.jpg'),
    getHelp2: require('../../../assets/images/5.9-Get-Help.jpg'),
    getHelp3: require('../../../assets/images/5.91-Get-Help.jpg'),
    getHelp4: require('../../../assets/images/5.92-Get-Help.jpg'),
    getHelp5: require('../../../assets/images/5.93-Get-Help.jpg'),
    getHelp6: require('../../../assets/images/5.94-Get-Help.jpg'),
    demo: require('../../../assets/images/demo.svg'),
    arrow: require('../../../assets/images/arrow.svg'),
    checkmark: require('../../../assets/images/noun_946401_cc.png'),
    step1: require('../../../assets/images/Step1.png'),
    step2: require('../../../assets/images/Step2.0.png'),
    shareLiveLocation: require('../../../assets/images/sharelivelocation.jpg'),
    screenshot1: require('../../../assets/images/Screenshot-2017-08-20-19.30.55.png'),
    screenshot2: require('../../../assets/images/Screenshot-2017-08-20-16.52.48.png'),
    screenshot3: require('../../../assets/images/Screenshot-2017-08-20-22.31.10.png'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
