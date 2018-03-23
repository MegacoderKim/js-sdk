import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGroup} from "ht-models";
import * as _ from "underscore";

@Component({
  selector: 'app-webhooks-options',
  templateUrl: './webhooks-options.component.html',
  styleUrls: ['./webhooks-options.component.less']
})
export class WebhooksOptionsComponent implements OnInit {
  @Input() events: string[];
  @Input() groups: IGroup[];
  @Output() updateParams: EventEmitter<object> = new EventEmitter();
  selectedEvents: string[] = [];
  selectedGroup: IGroup;
  constructor() { }

  ngOnInit() {
    this.update()
  }

  selectWebhookEvent(event: string, e) {
    e.stopPropagation();
    // e.cancelBubble;
    let toAdd = this.selectedEvents.indexOf(event) <= -1;
    if(toAdd) {
      this.selectedEvents.push(event)
    } else {
      this.selectedEvents = _.reject(this.selectedEvents, (choice) => {
        return choice == event
      })
    }
    this.update()
  }

  selectAllWebhookEvent(e) {
    e.stopPropagation();
    this.selectedEvents = [];
    this.update()
  }


  selectGroup(group, e) {
    e.stopPropagation();
    this.selectedGroup = group;
    this.update()
  }

  update() {
    let obj: {
      has_allowed_all: boolean,
      allowed_events: string[],
      group_id?: string
    } = {
      has_allowed_all: this.selectedEvents.length == 0,
      allowed_events: this.selectedEvents
    };
    obj = this.selectedGroup ? {...obj, group_id: this.selectedGroup.id} : obj;
    console.log(this.selectedGroup, "selected group");
    this.updateParams.next(obj)
  }

  reset() {
    this.selectedGroup = null;
    this.selectedEvents = [];
    this.update()
  }

}
