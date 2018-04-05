import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-live-location-sharing',
  templateUrl: './live-location-sharing.component.html',
  styleUrls: ['./live-location-sharing.component.less']
})
export class LiveLocationSharingComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    csecho: require('../../../assets/images/csecho.png'),
    csredbus: require('../../../assets/images/csredbus.png'),
    cshypertrack: require('../../../assets/images/cshypertrack.png'),
    stockPhoto1: require('../../../assets/images/canstockphoto14679514.jpg'),
    stockPhoto2: require('../../../assets/images/canstockphoto39703909.jpg'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
