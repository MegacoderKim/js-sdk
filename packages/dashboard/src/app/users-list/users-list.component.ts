import { Component, OnInit } from '@angular/core';
import {HtClientService} from "ht-angular";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {

  constructor(private clientService: HtClientService) { }

  ngOnInit() {
  }

}
