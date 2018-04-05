import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-location-based-assignment',
  templateUrl: './location-based-assignment.component.html',
  styleUrls: ['./location-based-assignment.component.less']
})
export class LocationBasedAssignmentComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    cshousejoy: require('../../../assets/images/cshousejoy.png'),
    csscootsy: require('../../../assets/images/csscootsy.png'),
    cspharmeasy: require('../../../assets/images/cspharmeasy.png'),
    stockPhoto1: require('../../../assets/images/canstockphoto4836332.jpg'),
    how: require('../../../assets/images/how.svg'),
    dashboard: require('../../../assets/images/dashboard1.jpg'),
    animatedGroup: require('../../../assets/images/Group_animated-3.svg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
