import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ht-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  @Input() hasMap: boolean = false;
  @Input() showMapOnly: boolean = false;
  @Input() sidebarWidth: number = 400;
  constructor(
  ) { }

  ngOnInit() {
  }


}
