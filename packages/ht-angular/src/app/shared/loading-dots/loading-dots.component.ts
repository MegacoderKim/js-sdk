import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ht-loading-dots',
  templateUrl: './loading-dots.component.html',
  styleUrls: ['./loading-dots.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoadingDotsComponent implements OnInit {
  @Input() show = true;
  @Input() size: number;
  constructor() { }

  ngOnInit() {
  }

}
