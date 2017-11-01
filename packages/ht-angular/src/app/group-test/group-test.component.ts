import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HtClientService} from "../ht/ht-client.service";
import {HtRequestService} from "../ht/ht-request.service";
import {clientApi} from "ht-client";

@Component({
  selector: 'ht-group-test',
  templateUrl: './group-test.component.html',
  styleUrls: ['./group-test.component.less']
})
export class GroupTestComponent implements OnInit, OnDestroy {
  key$;
  key;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.clientService.clearData();
    // const id = this.route.snapshot.paramMap.get('id');
    // let data = this.route.snapshot.data;
    const key = this.route.snapshot.data['key'];
    clientApi.setToken(key);
    this.key = key;
    // console.log(data, "data");
    // console.log("init");
    // const key$ = this.clientService.groups.api.get(id).map((group) => {
    //   console.log("group", group['token'], id);
    //   return group['token']
    // });
    // this.key$ = key$
    // console.log(this.route.snapshot.data, "data");
  }

  ngOnDestroy() {
    // this.clientService.groups.item.setId(null)
  }

}
