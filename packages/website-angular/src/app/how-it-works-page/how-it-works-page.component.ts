import { Component, OnInit } from '@angular/core';

require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-how-it-works-page',
  templateUrl: './how-it-works-page.component.html',
  styleUrls: ['./how-it-works-page.component.less']
})
export class HowItWorksPageComponent implements OnInit {
  images = {
    plugSDK: require('../../assets/images/plugSDK.png'),
    startStop: require('../../assets/images/startStop.png'),
    locoCloud: require('../../assets/images/locoCloud.png'),
    placeline: require('../../assets/images/placeline.png'),
    dashboard: require('../../assets/images/dashThree.png'),
    actions: require('../../assets/images/actions.png'),
    events: require('../../assets/images/events.png'),
    apiActions: require('../../assets/images/apiActions.png'),
    actionPrice: require('../../assets/images/actionPrice.png'),
    codec: require('../../assets/images/codec.svg'),
    demo: require('../../assets/images/demo.svg')
  };
  constructor() { }

  ngOnInit() {
  }

}
