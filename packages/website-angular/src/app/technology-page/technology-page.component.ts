import {Component, OnInit} from '@angular/core';
require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-technology-page',
  templateUrl: './technology-page.component.html',
  styleUrls: ['./technology-page.component.less']
})
export class TechnologyPageComponent implements OnInit {
  images = {
    filtering: require('../../assets/images/noun_195985_cc.svg'),
    battery: require('../../assets/images/noun_728474_cc.svg'),
    scalable: require('../../assets/images/noun_703015_cc.svg'),
    granular: require('../../assets/images/noun_569031_cc.svg'),
    accurate: require('../../assets/images/noun_298398_cc.svg'),
    dataSecurity: require('../../assets/images/Group.svg'),
    demo: require('../../assets/images/demo.svg')
  };
  constructor() { }

  ngOnInit() {
  }
}
