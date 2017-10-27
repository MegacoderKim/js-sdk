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

  userId = "b934b19f-de9c-4c38-9ad5-e59c2f075f06";
  constructor(
    private userService: HtUsersClientService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {


  }


}

