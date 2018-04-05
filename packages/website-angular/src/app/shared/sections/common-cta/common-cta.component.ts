import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-cta',
  templateUrl: './common-cta.component.html',
  styleUrls: ['./common-cta.component.less']
})
export class CommonCtaComponent implements OnInit {
  images = {
    demo: require('../../../../assets/images/demo.svg')
  };
  constructor() { }

  ngOnInit() {
  }

}
