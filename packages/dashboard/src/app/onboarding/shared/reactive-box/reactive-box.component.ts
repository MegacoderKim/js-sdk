import {Component, Input, OnInit} from '@angular/core';
import {SocketsService} from "../../../sockets.service";
import {OnboardingService} from "../../onboarding.service";
import {config} from "../../../config";
import {Observable} from "rxjs/Observable";
import {ISubAccount} from "ht-models";
import {AccountUsersService} from "../../../account/account-users.service";

@Component({
  selector: 'app-reactive-box',
  templateUrl: './reactive-box.component.html',
  styleUrls: ['./reactive-box.component.less']
})
export class ReactiveBoxComponent implements OnInit {
  message: string;
  subAccount$: Observable<ISubAccount>;
  @Input() eventType: string = "user.created";
  dashboardTimelineUrl: string = '';
  skValue: string;
  constructor(
    private socketService: SocketsService,
    private onboardingService: OnboardingService,
    private accountUserService: AccountUsersService
  ) { }

  ngOnInit() {
    this.listenOnEvents();
    this.subAccount$ = this.accountUserService.getSubAccount();
    this.subAccount$.take(1).subscribe((subAccount: ISubAccount) => {
      if (subAccount && subAccount.tokens) {
        let skToken = subAccount.tokens.find((token) => token.scope === 'secret' );
        this.skValue = skToken ? skToken.key : null;
      }
    });
  }



  isEventPending() {
    if (this.eventType === 'user.created') return !this.isUserCreated();
    if (this.eventType === 'tracking.started') return !this.isTrackingStarted();
    if (this.eventType === 'action.assigned') return !this.isActionAssigned();
  }

  isUserCreated() {
    return this.onboardingService.isUserCreated;
  }

  isTrackingStarted() {
    return this.onboardingService.isTrackingStarted;
  }

  isActionAssigned() {
    return this.onboardingService.isActionAssigned;
  }

  setUserCreated(userId) {
    this.onboardingService.isUserCreated = true;
    this.onboardingService.userIdIdentified = userId;
    this.dashboardTimelineUrl = `https://dashboard.hypertrack.com/widget/users/${userId}/timeline?key=${this.skValue}`;
  }

  setTrackingStarted() {
    this.onboardingService.isTrackingStarted = true;
  }

  setActionAssigned(actionId) {
    this.onboardingService.isActionAssigned = true;
    this.onboardingService.actionIdAssigned = actionId;
  }

  listenOnEvents() {
    this.socketService.on('user.created').subscribe((event) => {
      this.setUserCreated(event.data.user_id);
    });

    this.socketService.on('tracking.started').subscribe((event) => {
      this.setTrackingStarted();
    });

    this.socketService.on('action.assigned').subscribe((event) => {
      this.setActionAssigned(event.data.object_id);
    });
  }

  getEventMessage(eventType = this.eventType) {
    if (eventType === 'user.created') {
      return !this.isUserCreated() ? 'Waiting to identify user' : 'Good job! User identified.';
    } else if (eventType === 'tracking.started') {
      return !this.isTrackingStarted() ? 'Waiting for start tracking' : 'Good job! Tracking started.';
    } else if (eventType === 'action.assigned') {
      return !this.isActionAssigned() ? 'Waiting for assigned action' : 'Good job! Action assigned.';
    }
  }

}
