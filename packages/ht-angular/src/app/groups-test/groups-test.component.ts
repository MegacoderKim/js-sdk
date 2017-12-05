import { Component, OnInit } from '@angular/core';
import {HtClientService} from "../../";
import {Router} from "@angular/router";

@Component({
  selector: 'ht-groups-test',
  templateUrl: './groups-test.component.html',
  styleUrls: ['./groups-test.component.less']
})
export class GroupsTestComponent implements OnInit {

  constructor(
    private htClient: HtClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  setGroup(group) {
    const token = group.token;
    this.htClient.tempToken = token;
    this.router.navigate([''])
  }
}
