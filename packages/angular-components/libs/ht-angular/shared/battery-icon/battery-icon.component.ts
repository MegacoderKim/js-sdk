import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ht-battery-icon',
  templateUrl: './battery-icon.component.html',
  styleUrls: ['./battery-icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BatteryIconComponent implements OnInit {
  @Input() battery: number = 0;
  @Input() layout: 'column' | 'row' = 'row';
  @Input() reverse: boolean = false;
  @Input() iconType: 'fa' | 'ionicon' = 'fa';
  constructor() { }

  ngOnInit() {
  }

  batteryClass(level: number) {
    return this.iconType == 'ionicon' ? this.ioniconBatteryClass(level) : this.faBatteryClass(level)
  }

  private faBatteryClass(level: number) {
    let className = '';
    if (level > 90) {
      className = 'fa fa-battery-4';
    } else if (level > 70) {
      className = 'fa fa-battery-3';
    } else if (level > 25) {
      className = 'fa fa-battery-2';
    } else if (level > 5) {
      className = 'fa fa-battery-1 text-red';
    } else {
      className = 'fa fa-battery-0 text-red';
    };
    return className;
  };

  private ioniconBatteryClass(level: number) {
    let className = '';
    if (level > 90) {
      className = 'ion-battery-full';
    } else if (level > 50) {
      className = 'ion-battery-half';
    } else if (level > 10) {
      className = 'ion-battery-low';
    } else {
      className = 'ion-battery-empty text-red';
    };
    return className;
  }

}
