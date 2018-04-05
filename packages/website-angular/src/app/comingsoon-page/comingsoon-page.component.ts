import { Component, OnInit } from '@angular/core';
require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-comingsoon-page',
  templateUrl: './comingsoon-page.component.html',
  styleUrls: ['./comingsoon-page.component.less']
})
export class ComingsoonPageComponent implements OnInit {
  images = {
    comingSoon: require('../../assets/images/coming-soon.jpg')
  };
  constructor() { }

  ngOnInit() {
  }

}
