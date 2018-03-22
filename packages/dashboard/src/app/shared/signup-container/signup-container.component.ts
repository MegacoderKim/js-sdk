import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-signup-container',
  templateUrl: './signup-container.component.html',
  styleUrls: ['./signup-container.component.less']
})
export class SignupContainerComponent implements OnInit {
  @Input() title: string;
  logoImg = require("../../../images/logoblack.svg");
  constructor() { }

  ngOnInit() {
  }

}
