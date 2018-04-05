import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";


const plans = [
  {
    "name" : "Free forever",
    "icon" : require( '../../assets/images/pricing/illustration-free.svg'),
    "cost" : "0",
    "actionsCount" : "2,500",
    "cta" : "Get started",
    "id" : "free_forever:1"
  },
  {
    "name" : "Starter",
    "icon" : require( '../../assets/images/pricing/illustration-starter.svg'),
    "cost" : "599",
    "actionsCount" : "10,000",
    "cta" : "Try free for 30 days",
    "id": "starter:1"
  },
  {
    "name" : "Regular",
    "icon" : require( '../../assets/images/pricing/illustration-regular.svg'),
    "cost" : "1,899",
    "actionsCount" : "50,000",
    "cta" : "Try free for 30 days",
    "id" : "regular:1"
  },
  {
    "name" : "Enterprise",
    "icon" : require( '../../assets/images/pricing/illustration-enterprise.svg'),
    "cost" : "Custom",
    "actionsCount" : "50,000",
    "cta" : "Get in touch",
    "id" : "enterprise:1"
  }
];

const faqs = [{
  "question" : "What is an action?",
  "answer" : "Actions are what you track with HyperTrack. You control what an action is. Actions typically correspond to the key actions that your users perform in your app, viz. visit, meetup, pickup, delivery, share location, and so on. Unless otherwise specified, a user’s calendar day is tracked as one action. <a href=\"https://www.hypertrack.com/docs/guides/action\">Read Action Guide</a> to learn more."
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
}, {
  "question" : "Do you have a sandbox environment?",
  "answer" : "Yes, every account gets a free sandbox environment with full functionality before going live in production. You can test with upto 2500 actions per month in your sandbox environment."
}, {
  "question" : "Are stops and activity segments billed as actions?",
  "answer" : "No. An action may have multiple stops and activity segments. These will not be billed separately."
}];

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.less']
})

export class PricingComponent implements OnInit, AfterViewInit {

  images = {
  };
  plans = plans;
  faqs = faqs;
  constructor(
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit() {
  }


  openSignup( plan ) {
    if ( plan.name === 'Enterprise' ) {
      window["Intercom"]('showNewMessage', 'I am interested in the Enterprise plan. Could you give me more details about it ?');
    } else {
      this.router.navigate(['./'], {queryParams: {plan: plan.id}, relativeTo: this.route});
      this.modalService.open('signupModal');
    }
  }

  ngOnInit() {
  }

}
