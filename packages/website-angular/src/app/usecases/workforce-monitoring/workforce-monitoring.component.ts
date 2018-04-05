import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-workforce-monitoring',
  templateUrl: './workforce-monitoring.component.html',
  styleUrls: ['./workforce-monitoring.component.less']
})
export class WorkforceMonitoringComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    cstoppr: require('../../../assets/images/cstoppr.png'),
    cspharmeasy: require('../../../assets/images/cspharmeasy.png'),
    cscare24: require('../../../assets/images/cscare24.png'),
    slackAlert: require('../../../assets/images/slack-alert.jpg'),
    webhook: require('../../../assets/images/webhook.png'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
