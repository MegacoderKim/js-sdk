import { Component, OnInit, Input } from '@angular/core';
import {expandAppear, summaryAnim} from "../animations";

@Component({
  selector: 'ht-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: [
    expandAppear,
    summaryAnim
  ]
})
export class CollapsableComponent implements OnInit {
  open: boolean = false;
  @Input() showClose: boolean = true
  constructor() { }

  ngOnInit() {
  }


}
