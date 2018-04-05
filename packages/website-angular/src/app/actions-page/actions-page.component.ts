import { Component, OnInit } from '@angular/core';
require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-actions-page',
  templateUrl: './actions-page.component.html',
  styleUrls: ['./actions-page.component.less']
})
export class ActionsPageComponent implements OnInit {
  images = {
    actionMethods: require('../../assets/images/actionsmethods.png'),
    actionTypes: require('../../assets/images/actiontypes.png'),
    placeline: require('../../assets/images/placeline.gif'),
    actionPrice: require('../../assets/images/actionPrice.png'),
    how: require('../../assets/images/how.svg'),
    demo: require('../../assets/images/demo.svg')
  };
  constructor() { }

  ngOnInit() {
  }

}
