import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-steps-footer',
  templateUrl: './steps-footer.component.html',
  styleUrls: ['./steps-footer.component.less']
})
export class StepsFooterComponent implements OnInit {
  @Input() steps = [];
  @Input() showPlatformPicker;
  @Input() platformLogo;
  @Input() platform;
  @Input() activeState;
  @Output() goToPlatformPicker: EventEmitter<null> = new EventEmitter();
  @Output() jumpToStep: EventEmitter<any> = new EventEmitter();
  logos = {
    cordova: require('../../../../assets/image/cordova-logo.png'),
    react: require('../../../../assets/image/react-logo.png'),
    android: require('../../../../assets/image/android-logo.png'),
    apple: require('../../../../assets/image/apple-logo.png')
  };
  constructor() { }

  ngOnInit() {}

  getPlatformLogo() {
    switch(this.platform) {
      case 'android':
        return this.logos.android;
      case 'ios':
        return this.logos.apple;
      case 'react-native':
        return this.logos.react;
      case 'cordova':
        return this.logos.cordova;
      default:
        return null
    }
  }

  jumpToPlatformPicker() {
    this.goToPlatformPicker.emit();
  }

  onJumpToStep(step, index) {
    this.jumpToStep.emit({step, index});
  }

}
