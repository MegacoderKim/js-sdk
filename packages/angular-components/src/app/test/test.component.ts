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
  showAll: boolean = false;
  userId = "43fbf0db-530b-4f79-9093-6f565ea6d37e";
  constructor(
    private userService: HtUsersService,
  ) { }

  ngOnInit() {
    if (this.showAll) this.userService.setShowAll();
  }


}

