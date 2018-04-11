import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ht-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() hasMap: boolean = false;
  constructor(
  ) { }

  ngOnInit() {
  }


}
