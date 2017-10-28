import { Component, OnInit } from '@angular/core';
import {QueryLabel} from "ht-client"
import {Color} from "ht-utility";
import {HtUsersService} from "../ht/ht-users.service";
import {HtClientService} from "../ht/ht-client.service";
@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "b934b19f-de9c-4c38-9ad5-e59c2f075f06";
  constructor(
    private userService: HtUsersService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {


  }


}

