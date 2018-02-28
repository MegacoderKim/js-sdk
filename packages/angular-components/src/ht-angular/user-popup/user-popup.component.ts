import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { IAction } from "ht-models";

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPopupComponent implements OnInit {
  @Input() action: IAction;
  opened: boolean = false;
  constructor() { }

  ngOnInit() {

  }

  openCard() {
    this.opened = !this.opened;
  }

}
