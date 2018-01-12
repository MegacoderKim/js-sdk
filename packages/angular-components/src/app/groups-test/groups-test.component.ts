import { Component, OnInit } from '@angular/core';
import {HtClientService} from "../ht/ht-client.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ht-groups-test',
  templateUrl: './groups-test.component.html',
  styleUrls: ['./groups-test.component.less']
})
export class GroupsTestComponent implements OnInit {
  groupId: string;
  constructor(
    private htClient: HtClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id')
  }
  setGroup(group) {
    const token = group.token;
    this.htClient.tempToken = token;
    this.router.navigate(['users'], {queryParamsHandling: 'merge'})
  }
}
