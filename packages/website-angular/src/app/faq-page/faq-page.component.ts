import { Component, OnInit } from '@angular/core';

require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.less']
})
export class FaqPageComponent implements OnInit {
  images = {
    demo: require('../../assets/images/demo.svg')
  };
  constructor() { }

  ngOnInit() {
  }

}
