import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-action-zero-state',
  templateUrl: './action-zero-state.component.html',
  styleUrls: ['./action-zero-state.component.less']
})
export class ActionZeroStateComponent implements OnInit {

  platforms = {
    andorid: require('../../../../assets/image/platforms/android.png'),
    apple: require('../../../../assets/image/platforms/apple.svg'),
    java: require('../../../../assets/image/platforms/java.png'),
    python: require('../../../../assets/image/platforms/python.png'),
    react: require('../../../../assets/image/platforms/react-native.png'),
    'ruby': require('../../../../assets/image/platforms/ruby.png'),
    actiontypes: require('../../../../assets/image/actiontypes.png'),
  }
  constructor(
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
  }

  openBilling() {
  }

  onCardAdded(isAdded) {

  }
}
