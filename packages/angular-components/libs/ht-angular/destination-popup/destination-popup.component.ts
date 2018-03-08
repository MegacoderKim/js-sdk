import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAction, IPlace} from "ht-models";

@Component({
  selector: 'ht-destination-popup',
  templateUrl: './destination-popup.component.html',
  styleUrls: ['./destination-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationPopupComponent implements OnInit {
  @Input() action: IAction;
  constructor() { }

  ngOnInit() {

  }

  getDestinationName(action: IAction): string {
    const place: IPlace = action.completed_place || action.expected_place;
    if (place) {
      return place.name;
    } else {
      return ""
    }
  }

}
