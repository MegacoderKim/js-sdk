import { Component, OnInit } from '@angular/core';
require('../../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-profiling-user-places',
  templateUrl: './profiling-user-places.component.html',
  styleUrls: ['./profiling-user-places.component.less']
})
export class ProfilingUserPlacesComponent implements OnInit {
  images = {
    demo: require('../../../assets/images/demo.svg'),
    zomatoLogo: require('../../../assets/images/zomato_logo.svg'),
    okhi: require('../../../assets/images/okhi1.png'),
    holachef: require('../../../assets/images/holachef.jpg'),
    scootsy: require('../../../assets/images/scootsy2.jpg'),
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
