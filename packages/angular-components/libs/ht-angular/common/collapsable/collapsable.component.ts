import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ht-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss']
})
export class CollapsableComponent implements OnInit {
  open: boolean = false;
  constructor() { }

  ngOnInit() {
  }


}
