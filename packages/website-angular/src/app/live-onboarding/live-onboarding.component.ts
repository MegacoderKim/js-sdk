import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import {LiveOnboardingService} from "./live-onboarding.service";
import * as firebase from "firebase";
import * as PhoneNumber from 'libphonenumber-js';
declare const ga: any;
import {ExternalAnalyticsService} from "../services/external-analytics.service";
import {OnboardingService} from "../services/onboarding.service";
let ClipboardJS = require('clipboard');
let _window: any = () => {
  // return the global native browser window object
  return window;
};
@Component({
  selector: 'app-live-onboarding',
  templateUrl: './live-onboarding.component.html',
  styleUrls: ['./live-onboarding.component.less']
})
export class LiveOnboardingComponent implements OnInit, AfterViewInit, OnChanges {
  images = {
    hypertrackLogo: require('../../assets/images/hyperstart/hypertrack.svg'),
    reactLogo: require('../../assets/images/hyperstart/react.svg'),
    androidLogo: require('../../assets/images/hyperstart/android.svg'),
    iosLogo: require('../../assets/images/hyperstart/ios.svg'),
    xamarinLogo: require('../../assets/images/hyperstart/xamarin.svg'),
    cordovaLogo: require('../../assets/images/hyperstart/cordova.svg'),
    quickstartIcon: require('../../assets/images/hyperstart/quickstart.svg'),
    phoneIcon: require('../../assets/images/hyperstart/phone.svg'),
    obDiagram: require('../../assets/images/hyperstart/obDiagram.svg'),
    obCopy: require('../../assets/images/hyperstart/obCopy.svg'),
    obPhone: require('../../assets/images/hyperstart/obPhone.svg'),
    obWaiting: require('../../assets/images/hyperstart/obWaiting_animated.svg'),
    miniLoader: require('../../assets/images/hyperstart/miniLoader_animated.svg'),
  };
  phoneNumber: string = '';
  showError: boolean = false;
  showSMSSuccess: boolean = false;
  showCopiedMessage: boolean = false;
  isValidNumber: boolean = false;
  errorMessage: string = "Please enter a valid number with country code.";
  successMessage: string = "Sent via SMS!";
  isSendingMessage: boolean = false;
  @Input() currentSelectedTab: string;
  @Input() leadResponse;
  @Input() isAccountAccepted: boolean;
  @Output() switchSelectedTab: EventEmitter<string> = new EventEmitter();
  constructor(
    private onboardingService: OnboardingService,
    private externalAnalyticsService: ExternalAnalyticsService
  ) { }
  ngOnInit() {}

  ngOnChanges(changes) {}

  ngAfterViewInit() {
    let clip = new ClipboardJS('.copy-button-trigger', {
      text: () => {
        if (!this.isMobileDevice()) {
          return this.getBranchTrackingLink();
        }
      }
    });
    clip.on('success', (e) => {
      let branchLink = this.leadResponse ? this.leadResponse.branch_link : '';
      if (branchLink) {
        this.externalAnalyticsService.logSegmentEvent( "copied link", "interaction", "live-integration", {
          platform: 'test-app',
          branchLink: branchLink
        })
        this.showCopiedMessage = true;
      }
    });
  }

  getSMSButtonMessage() {
    let message = 'Send It To Me';
    if (this.isSendingMessage) {
      message = 'Sending...';
    } else if (this.showSMSSuccess) {
      message = this.successMessage;
    }
    return message;
  }

  handleBranchLinkClick() {
    let branchLink = this.leadResponse ? this.leadResponse.branch_link : '';
    if (this.isMobileDevice() && branchLink) {
      this.externalAnalyticsService.logSegmentEvent( "Clicked link", "interaction", "live-integration", {
        platform: 'test-app',
        branchLink: branchLink
      });
      window.open(branchLink);
    }
  }

  phoneNumberChanged(value) {
    this.showError = false;
    this.showSMSSuccess = false;
    this.showCopiedMessage = false;
    this.isValidNumber = PhoneNumber.isValidNumber(PhoneNumber.parse(value));
  }

  getBranchTrackingLink() {
    if (this.leadResponse) {
      return (this.leadResponse.branch_link || '...');
    }
    return '...';
  }

  onSendViaMessage() {
    this.showSMSSuccess = false;
    this.showError = false;
    if (this.isSendingMessage) {
      return;
    }
    if (!this.isValidNumber) {
      this.showError = true;
      return;
    }
    if (!this.leadResponse || !this.leadResponse.id) {
      return;
    }
    let accountId = this.leadResponse.id;
    this.isSendingMessage = true;
    this.onboardingService
      .sendAccountInvite(this.phoneNumber, accountId)
      .subscribe(() => {
      this.isSendingMessage = false;
      this.showError = false;
      this.showSMSSuccess = true;
      this.externalAnalyticsService.logSegmentEvent( "Entered phone number", "interaction", "live-onboarding", {
        platform: 'test-app',
        branchLink: this.leadResponse.branch_link,
        accountId: this.leadResponse.id
      });
      this.isSendingMessage = false;
    }, (err) => {
      this.isSendingMessage = false;
      this.showError = true;
    });
  }

  isMobileDevice() {
    let check = false;
    (function(a){if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || _window().opera);
    return check;
  }

  handleEnterKeyPress($event) {
    $event.preventDefault();
    this.onSendViaMessage();
  }

  showTabContent(tab) {
    return (this.currentSelectedTab && this.currentSelectedTab === tab);
  }
}
