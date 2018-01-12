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

  constructor() { }

  ngOnInit() {
  }

  batteryClass(level) {
    let className = '';
    if (level > 90) {
      className = 'fa-battery-4';
    } else if (level > 70) {
      className = 'fa-battery-3';
    } else if (level > 25) {
      className = 'fa-battery-2';
    } else if (level > 5) {
      className = 'fa-battery-1 text-red';
    } else {
      className = 'fa-battery-0 text-red';
    };
    return className;
  }

}
