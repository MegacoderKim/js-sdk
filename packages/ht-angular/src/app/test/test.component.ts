import { Component, OnInit } from '@angular/core';
import {QueryLabel, UsersPlacelineClientFactory} from "ht-client"
import {Color} from "ht-utility";
import {HtUsersService} from "../ht/ht-users.service";
import {HtClientService} from "../ht/ht-client.service";
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "44e37638-0bd9-428a-9d74-556092ac712a";
  constructor(
    private userService: HtUsersService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {
    // this.userService.markers.setActive()
    // this.userService.marksIndex.setActive();

    // this.userService.placeline.pollDuration = 2000;
    // this.userService.placeline.updateStrategy = 'once'
    // console.log(this.userService.placeline);

    // var t = UsersPlacelineClientFactory().init();
    // // console.log(t);
    // t.setId(this.userId);
    // // t.init();
    // // t.apiQuery$().switchMap(data => {
    // //   // return Observable.of(data);
    // //   return t.getData$(data);
    // // }).subscribe(data => {
    // //   console.log(data, "Da");
    // //
    // // })
    // t.data$.subscribe(data => {
    //   console.log(data, "dsasd");
    // });
    // setTimeout(() => {
    //   t.pollDuration = 0;
    //   console.log("hit");
    // }, 4000);
    // // console.log(t.sayHi());
  }


}

