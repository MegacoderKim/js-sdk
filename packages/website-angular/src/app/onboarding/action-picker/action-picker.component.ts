import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-picker',
  templateUrl: './action-picker.component.html',
  styleUrls: ['./action-picker.component.less']
})
export class ActionPickerComponent implements OnInit {
  @Input() content;
  images = {
    deliveryIcon : require( '../../../assets/images/icons/action-types/delivery.svg'),
    visitIcon : require( '../../../assets/images/icons/action-types/visit.svg'),
    ttdIcon : require( '../../../assets/images/icons/action-types/appointment.svg')
  };
  actionCase = -1;
  constructor() { }
  ngOnInit() {
    console.log(this.content);
  }

  switchAction( index ) {
    if ( index === this.actionCase) {
      this.actionCase = -1;
    } else {
      this.actionCase= index;
    }
  }

}
