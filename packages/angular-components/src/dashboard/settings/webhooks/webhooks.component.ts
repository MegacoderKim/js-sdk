import { Component, OnInit } from '@angular/core';
import {IsValidUrl} from "../../../utils/validations";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {AccountUsersService} from "../../account/account-users.service";
import * as _ from "underscore";
import {IWebhook} from "ht-models";

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.less', '../settings-editor/settings-editor.component.less']
})
export class WebhooksComponent implements OnInit {
  addSlackWebhook: boolean = false;
  addWebhook: boolean = false;
  eventsChoices: string[];
  webhookEventChoice: string[] = [];
  slackEventChoice: string[] = [];
  webhooks: IWebhook[];
  loadingWebhooks: boolean = true;
  groups: any[];
  selectedGroup;
  params: object;
  groupEntity;
  constructor(
      private accountUserService: AccountUsersService,
      private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.fetchEventTypes();
    this.fetchWebhooks();
    this.fetchGroups()
  }

  addingSlackWebhook() {
    console.log("add");
    this.addSlackWebhook = true;
  }

  closeAddingSlackWebhook() {
    this.addSlackWebhook = false;
  }

  addingWebhook() {
    this.addWebhook = true;
  }

  closeAddingWebhook() {
    this.addWebhook = false;
  }


  private fetchEventTypes() {
    this.accountUserService.getEventChoices().subscribe(eventChoices => {
      this.eventsChoices = _.map(_.values(eventChoices), item => item[0]);
    })
  }

  selectWebhookEvent(event: string, e) {
    e.stopPropagation();
    // e.cancelBubble;
    let toAdd = this.webhookEventChoice.indexOf(event) <= -1;
    if(toAdd) {
      this.webhookEventChoice.push(event)
    } else {
      this.webhookEventChoice = _.reject(this.webhookEventChoice, (choice) => {
        return choice == event
      })
    }

  }

  selectAllWebhookEvent(e) {
    e.stopPropagation();
    this.webhookEventChoice = []
  }

  selectSlackWebhookEvent(event: string, e) {
    e.stopPropagation();
    // e.cancelBubble;
    let toAdd = this.slackEventChoice.indexOf(event) <= -1;
    if(toAdd) {
      this.slackEventChoice.push(event)
    } else {
      this.slackEventChoice = _.reject(this.slackEventChoice, (choice) => {
        return choice == event
      })
    }

  }

  selectGroup(group, e) {
    e.stopPropagation();
    this.selectedGroup = group;
  }

  selectAllSlackWebhookEvent(e) {
    e.stopPropagation();
    this.slackEventChoice = []
  }

  saveWebhook(url, options) {
    let obj = {
      type: 'web',
      url,
      ...this.params
    };
    this.postWebhook(obj, options)
  }

  saveSlackWebhook(url, options) {

    let obj = {
      type: 'slack',
      url,
      ...this.params
    };
    this.postWebhook(obj, options)
  }

  private postWebhook(obj, options) {
    if(!IsValidUrl(obj.url)) {
      this.snackbarService.displayErrorToast('Please enter a valid url');
      return false;
    }
    // options.reset()
    this.accountUserService.addWebhook(obj).subscribe((webhook) => {
      console.log(webhook, "sswweb");
      this.webhooks.push(webhook);
      this.addSlackWebhook = false;
      this.addWebhook = false;
    })
  }

  private fetchWebhooks() {
    this.accountUserService.getWebhooks().subscribe((webhooks) => {
      this.webhooks = webhooks.results;
      this.loadingWebhooks = false;
    })
  }

  deleteWebhook(webhookId: string) {
    this.accountUserService.deleteWebhook(webhookId).subscribe(() => {
      this.webhooks = _.reject(this.webhooks, (webhook: IWebhook) => {
        return webhook.id == webhookId
      })
    })
  }

  onUpdateParams(params: object) {
    this.params = params;
    console.log("pata", params);
  }

  testWebhook(webhook, eventType) {
    console.log(webhook, eventType);
    this.snackbarService.displayLoadingToast(`Firing event ${eventType}`);
    this.accountUserService.testWebhook(webhook.id, eventType).subscribe(() => {
      this.snackbarService.hideLoadingToast();
      this.snackbarService.displaySuccessToast('Webhook was successfully fired')
    }, err => {
      err = err.json();
      this.snackbarService.hideLoadingToast();
      this.snackbarService.displayErrorToast(err.error)
    })
  }

  private fetchGroups() {
    this.accountUserService.getGroups({page_size: 10000}).subscribe((groups) => {
      this.groups = groups.results;
      this.groupEntity = _.indexBy(this.groups, 'id')
    })
  }
}
