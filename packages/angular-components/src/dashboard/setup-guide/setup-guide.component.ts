import {Component, Input, OnInit} from '@angular/core';
import {ISetupStep} from "../model/steps";
import {animate, style, transition, trigger} from "@angular/animations";
import {IAccount, ISubAccount} from "ht-models";
import {Observable} from "rxjs/Observable";
import {AccountUsersService} from "../account/account-users.service";
import {ExternalAnalyticsService} from '../core/external-analytics.service';
import {config} from '../config';
import {timer} from "rxjs/observable/timer";
import {ActivatedRoute} from '@angular/router';
let ClipboardJS = require('clipboard');

const steps = [{
  "index" : 1,
  "incompleteLabel" : "Signed up",
  "completeLabel" : "Signup sucessfull",
  "completeCta" : "See your app keys →",
  "status" : "complete"
},{
  "index" : 2,
  "incompleteLabel" : "Plugin the SDK into the app",
  "completeLabel" : "You are setup for Android",
  "completeCta" : "Integrate for other platforms →",
  "status" : "incomplete"
},{
  "index" : 3,
  "incompleteLabel" : "Build your use case",
  "completeLabel" : "You have started using primitives",
  "completeCta" : "Checkout our tutorials →",
  "status" : "incomplete"
},{
  "index" : 4,
  "incompleteLabel" : "Setup billing",
  "completeLabel" : "Upgraded to pay per action",
  "completeCta" : "Update billing preferences → ",
  "status" : "incomplete"
},{
  "index" : 5,
  "incompleteLabel" : "Move to production",
  "completeLabel" : "Hypertrack is now live on production",
  "completeCta" : "Take a look at customer stories → ",
  "status" : "incomplete"
}];

const guides = [{
  "title" : "Get location and activity history",
  "description" : "Know what the user is doing, e.g. walk, run, drive and stop.",
  "link" : "https://docs.hypertrack.com/gettingstarted/activities.html",
  "image" : require( '../../assets/image/guide-cover-image/guide-1.png')
},{
  "title" : "Get smart & accurate ETA",
  "description" : "Get smart ETAs that factor vehicle type, user profile and the time it takes ",
  "link" : "https://docs.hypertrack.com/api/entities/action.html#the-action-object",
  "image" : require( '../../assets/image/guide-cover-image/guide-2.png')
},{
  "title" : "Track device’s health",
  "description" : "Keep tabs on critical health parameters of the device.",
  "link" : "https://docs.hypertrack.com/api/entities/user.html",
  "image" : require( '../../assets/image/guide-cover-image/guide-3.png')
},{
  "title" : "Calculate mileage",
  "description" : "Get accurate distance and time traveled for each action. ",
  "link" : "https://docs.hypertrack.com/api/entities/action.html#meter-an-action",
  "image" : require( '../../assets/image/guide-cover-image/guide-4.png')
},{
  "title" : "Get route travelled",
  "description" : "Know where the user is. Get the time-aware polyline for each activity segment.",
  "link" : "https://docs.hypertrack.com/gettingstarted/route.html",
  "image" : require( '../../assets/image/guide-cover-image/guide-5.png')
},{
  "title" : "Setup alerts",
  "description" : "Get real-time status when unexpected things happen along the way",
  "link" : "https://docs.hypertrack.com/events/",
  "image" : require( '../../assets/image/guide-cover-image/guide-6.png')
}];

const plans = [{
  "name" : "Starter",
  "icon" : require( '../../assets/images/pricing/illustration-starter.svg'),
  "cost" : "599",
  "actionsCount" : "10,000",
  "cta" : "Upgrade",
  "id": "starter:1"
},{
  "name" : "Regular",
  "icon" : require( '../../assets/images/pricing/illustration-regular.svg'),
  "cost" : "1,899",
  "actionsCount" : "50,000",
  "cta" : "Upgrade",
  "id" : "regular:1"
},{
  "name" : "Enterprise",
  "icon" : require( '../../assets/images/pricing/illustration-enterprise.svg'),
  "cost" : "Custom",
  "actionsCount" : "50,000",
  "cta" : "Get in touch",
  "id" : "enterprise:1"
}];

const faqs = [{
  "question" : "What is an action?",
  "answer" : "Actions are what you track with HyperTrack. You control what an action is. Actions typically correspond to the key actions that your users perform in your app, viz. visit, meetup, pickup, delivery, share location, and so on. Unless otherwise specified, a user’s calendar day is tracked as one action."
}, {
  "question" : "What features are included?",
  "answer" : "Each plan, free and paid, comes with unlimited consumption of data, visuals or events for actions that you create. There is no limit on the number of use cases, API gets, tracking views, consuming applications, webhooks received, Slack alerts or team members with dashboard access.",
}, {
  "question" : "When does my card get charged?",
  "answer": "For any month, you get charged on the first of the following month. Partial months are pro-rated."
}, {
  "question" : "When does an action get counted for billing purposes?",
  "answer" : "The action gets counted as soon as they are created."
}, {
  "question" : "What if I exceed the actions limit in a given month?",
  "answer" : "You will not be able to create more actions once you hit the limit. Upgrade to the next tier if you wish to continue using without disruption."
}, {
  "question" : "Can I switch between plans?",
  "answer" : "Yes, you can switch between any of the paid plans at any time by visiting the billing details on your dashboard."
},{
  "question" : "Do you have a sandbox environment?",
  "answer" : "Yes, every account gets a free sandbox environment with full functionality before going live in production. You can test with upto 2500 actions per month in your sandbox environment."
}];

const copyStates = {
  testKey : false,
  testSecret : false,
  prodKey : false,
  prodSecret: false
};

@Component({
  selector: 'app-setup-guide',
  templateUrl: './setup-guide.component.html',
  styleUrls: ['./setup-guide.component.less'],
  animations: [
    trigger('drop', [
      transition(':enter', [
        style({height: 0}),
        animate('0.3s' + ' ease-in', style({height: '*'}))
      ]),
      transition(':leave', [
        animate('0.3s' + ' ease-out', style({opacity: '0', height: 0}))
      ])])
  ]
})

export class SetupGuideComponent implements OnInit {
  steps: ISetupStep[] = steps;
  guides = guides;
  currentStep: ISetupStep = this.steps[0];
  currentPlan = plans[0];
  faqs = faqs;
  plans = plans;
  currentPlanId;
  isCardAdded;
  copyStates = copyStates;
  pkValue = {
    test: 'YOUR TEST PUBLISHABLE KEY',
    prod: 'YOUR PUBLISHABLE KEY'
  };
  skValue = {
    test: 'YOUR TEST SECRET KEY',
    prod: 'YOUR SECRET KEY'
  };
  images = {
    "visuals" : require( '../../assets/image/onboarding/visuals.svg'),
    "actions" : require( '../../assets/image/onboarding/actions.svg'),
    "data" : require( '../../assets/image/onboarding/data-api.svg'),
    "webhooks" : require( '../../assets/image/onboarding/webhooks-pricing.svg'),
    "scooter" : require( '../../assets/image/onboarding/kids-scooter.svg')
  };
  timerSub;
  config = config;
  account: IAccount;
  @Input() codeBlockKey: string;
  constructor(
    private accountUserService: AccountUsersService,
    private externalAnalyticsService: ExternalAnalyticsService,
    private route: ActivatedRoute
  ) {
    let subAccountTest$ = this.accountUserService.getSubAccount('test');
    subAccountTest$.take(1).subscribe((subAccount: ISubAccount) => {
      if (subAccount && subAccount.tokens) {
        let pkToken = subAccount.tokens.find((token) => token.scope === 'publishable' );
        this.pkValue.test = pkToken ? pkToken.key : null;
        let skToken = subAccount.tokens.find((token) => token.scope === 'secret' );
        this.skValue.test = skToken ? skToken.key : null;
      }
    });
    let subAccountProd$ = this.accountUserService.getSubAccount('production');
    subAccountProd$.take(1).subscribe((subAccount: ISubAccount) => {
      if (subAccount && subAccount.tokens) {
        let pkToken = subAccount.tokens.find((token) => token.scope === 'publishable' );
        this.pkValue.prod = pkToken ? pkToken.key : null;
        let skToken = subAccount.tokens.find((token) => token.scope === 'secret' );
        this.skValue.prod = skToken ? skToken.key : null;
      }
    });
  }

  findPlanObject( planID ) {
    this.currentPlan = plans.find( function ( element ) {
        return element.id == planID;
    });
    this.currentPlan = this.currentPlan || this.plans[0];
  }

  ngOnInit() {
    this.accountUserService.getAccount().filter(data => !!data).take(1)
    .subscribe((account) => {
        this.currentPlanId = account['billing_plan'];
        this.currentPlanId = this.currentPlanId || 'free_forever:1';
        this.currentPlanId = 'free_forever:1';
        this.findPlanObject( this.currentPlanId );
        this.isCardAdded = !!(account['card']);
    });
  }

  initiateCopiedTimer( key ) {
    this.copyStates[ key ] = true;
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.timerSub = timer(1000)
      .take(1)
      .subscribe(() => {
        this.copyStates[ key ] = false;
      });
  }

  ngAfterViewInit() {
  }

  setStep( step: ISetupStep ) {
    const currentIndex = step.index;
    this.currentStep = step;
    let eventName;
    switch( currentIndex ) {
      case 1:
        eventName = 'signup';
        break;
      case 2:
        eventName = 'integrate platform';
        break;
      case 3:
        eventName = 'look at primitives';
        break;
      case 4:
        eventName = 'moved to billing';
        break;
      case 5 :
        eventName = 'see production step';
        break;
      default:
        eventName = 'see onboarding step'
    }
    this.externalAnalyticsService.logSegmentEvent(eventName, 'interaction', 'onboarding' );
    this.steps = this.steps.map(( step ) => {
      if (step.index === 1) {
        return {...step};
      } else if ( step.index==currentIndex ) {
        return {...step, status: 'active'};
      } else if ( step.index < currentIndex ){
        return {...step, status: 'incomplete'};
      } else {
        return {...step, status: 'incomplete'};
      }
    })
  }

  indexId(index, item){
    return item.index
  }
}
