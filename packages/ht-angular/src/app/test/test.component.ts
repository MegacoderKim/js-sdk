import { Component, OnInit } from '@angular/core';
import {Color} from "ht-utility";
import {HtUsersService} from "../ht/ht-users.service";
import {Observable} from "rxjs/Observable";
import {filter} from "rxjs/operators";
import {combineLatest} from "rxjs/observable/combineLatest";
import {of} from "rxjs/observable/of";
import {empty} from "rxjs/observable/empty";
@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "44e37638-0bd9-428a-9d74-556092ac712a";
  constructor(
    private userService: HtUsersService,
  ) { }

  ngOnInit() {

  }


}

