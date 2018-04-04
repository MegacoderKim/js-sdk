import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.less']
})
export class LoginContainerComponent implements OnInit {
  logoImg = require("images/logoblack.svg");
  constructor() { }

  ngOnInit() {
  }

}
