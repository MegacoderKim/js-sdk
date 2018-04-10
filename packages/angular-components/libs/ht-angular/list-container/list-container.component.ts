import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ht-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
  @HostBinding('style.width.px')
  width = 400;
  constructor() { }

  ngOnInit() {
  }

}
