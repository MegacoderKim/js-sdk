import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ht-loading-data',
  templateUrl: './loading-data.component.html',
  styleUrls: ['./loading-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingDataComponent implements OnInit {
  @Input() size: number;
  @Input() message: string = "";
  @Input() customMessage: string;
  constructor() { }

  ngOnInit() {
  }

  get displayMessage() {
    return !this.customMessage ? `${this.message}` : this.customMessage;
  }

}
