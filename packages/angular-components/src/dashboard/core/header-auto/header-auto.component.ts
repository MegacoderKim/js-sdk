import { Component, OnInit } from '@angular/core';
import {config} from "../../config";

@Component({
  selector: 'app-header-auto',
  templateUrl: './header-auto.component.html',
  styleUrls: ['./header-auto.component.less']
})
export class HeaderAutoComponent implements OnInit {
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = !!config.token;
  }

  ngOnInit() {
  }

}
