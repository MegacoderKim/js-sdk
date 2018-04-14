import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAction, IPlace} from "ht-models";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-destination-popup',
  templateUrl: './destination-popup.component.html',
  styleUrls: ['./destination-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationPopupComponent implements OnInit {
  @Input() action: IAction;
  @Input() idle$: Observable<boolean>;
  isOpended: boolean = false;
  constructor() { }

  ngOnInit() {

  }

  getDestinationName(action: IAction): string {
    const place: IPlace = action.completed_place || action.expected_place;
    if (place) {
      return place.display_text;
    } else {
      return ""
    }
  }

  getAddress(action): string {
    const place: IPlace = action.completed_place || action.expected_place;
    if (place) {
      return place.address;
    } else {
      return ""
    }
  };

  forNoEta(action: IAction): string {
    if (action.arrival_status == 'arrived' || action.arrival_status == 'arriving') {
      return action.display.status_text
    } else {
      return "Unavailable"
    }
  }

}
