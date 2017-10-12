import { Component, OnInit } from '@angular/core';
import {HtClientService, HtUsersClientService} from "ht-angular-client";
import {QueryLabel} from "ht-js-client"
import {Color} from "ht-js-utils";
@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "1373d1e5-4435-4168-90cb-1d7d8ead7d4b";
  constructor(
    private userService: HtUsersClientService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {


  }


}

