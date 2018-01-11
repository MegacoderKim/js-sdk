import {Component, Input, OnInit} from '@angular/core';
import {IGroup} from "ht-models";

@Component({
  selector: 'ht-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit {
  @Input() groups: IGroup[];
  @Input() groupIdParam: string = 'id';

  constructor() { }

  ngOnInit() {
  }

}
