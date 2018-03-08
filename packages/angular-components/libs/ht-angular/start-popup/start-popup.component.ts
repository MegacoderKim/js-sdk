import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IAction, IPlace} from "ht-models";

@Component({
  selector: 'ht-start-popup',
  templateUrl: './start-popup.component.html',
  styleUrls: ['./start-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartPopupComponent implements OnInit {
  @Input() action: IAction;
  constructor() { }

  ngOnInit() {

  }

  getStartName(action: IAction): string {
    const place: IPlace = action.started_place;
    if (place) {
      return place.name;
    } else {
      return ""
    }
  }

}
