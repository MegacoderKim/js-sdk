import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {config} from "../../config";
import {SocketsService} from "../../sockets.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pick-platform',
  templateUrl: './pick-platform.component.html',
  styleUrls: ['./pick-platform.component.less']
})
export class PickPlatformComponent implements OnInit {
  logos = {
    cordova: require('../../../assets/image/cordova-logo.png'),
    react: require('../../../assets/image/react-logo.png'),
    android: require('../../../assets/image/android-logo.png'),
    apple: require('../../../assets/image/apple-logo.png')
  };
  isLoggedIn: boolean;
  title: "Add HyperTrack to your app";
  subtitle: "Integrate SDK in just few steps";
  @Input() showReactNative: boolean = true;
  @Input() useDefaultNav: boolean = true;
  @Input() selectedPlatform: string = '';
  @Output() onPlatformPick: EventEmitter<string> = new EventEmitter();
  constructor(
    private router: Router
  ) {
    this.isLoggedIn = !!config.token;
  }

  ngOnInit() {
  }

  navigateToPlatform(platform) {
    if (this.useDefaultNav) {
      this.router.navigate([`/onboarding/${this.getSDKPlugUrl(platform)}`]);
    }
    this.onPlatformPick.emit(platform);
  }

  getSDKPlugUrl(platform) {
    let platformMap = {
      'android': 'sdk-android',
      'react-native': 'sdk-reactnative',
      'ios': 'sdk-ios'
    };
    return platformMap[platform] || 'sdk-android';
  }

}
