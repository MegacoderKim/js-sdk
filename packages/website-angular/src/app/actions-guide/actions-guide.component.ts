import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions-guide',
  templateUrl: './actions-guide.component.html',
  styleUrls: ['./actions-guide.component.less']
})
export class ActionsGuideComponent implements OnInit {
  images = {
    background: require('../../assets/images/guides/actions-bg.png'),
    actionTypes : require('../../assets/images/guides/action-types.png'),
    placeline : require('../../assets/images/guides/placeline.png'),
    orderTracking : require('../../assets/images/guides/order-tracking.png'),
    orderTrackingMultiple : require('../../assets/images/guides/order-tracking-multiple.png')
  };
  constructor() { }
  ngOnInit() {
  }

}
