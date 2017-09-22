import { Component, OnInit } from '@angular/core';
import {HtClientService, HtUsersClientService} from "ht-angular-client";

@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "9eab3039-9e46-4048-ae29-ba068de325c7";
  constructor(
    private userService: HtUsersClientService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {
    // this.clientService.store.subscribe((state) => {
    //   console.log("state", state);
    // });
    // // console.log(getUiAState);
    // this.clientService.store.select(getUiAState).subscribe((a) => {
    //   console.log("state a", a);
    // })
    // this.clientService.store.select(getUiAState).subscribe((a) => {
    //   console.log("state a 2", a);
    // })
  }

  dispatchA() {
    // this.clientService.store.dispatch({type: 'setA', payload: "Dasd"})
  }

  dispatchB() {
    // this.clientService.store.dispatch({type: 'setB', payload: "ddsds"})
  }

}

