import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import * as _ from 'underscore';
import {AccountUsersService} from "./account/account-users.service";
import {ISubAccount} from "ht-models";
var io = require('socket.io-client');

@Injectable()
export class SocketsService {
  private socket;
  public event$: Subject<Object> = new Subject();
  subAccountId: string;
  socketURL: string = "http://localhost:4200";
  constructor(
    private accountService: AccountUsersService
  ) {
    this.accountService.getSubAccount().filter((data) => !!data).take(1).subscribe((subAccount: ISubAccount) => {
      console.log("Sub account id", subAccount.id);
      this.subAccountId = subAccount.id;
      this.join(this.subAccountId);
    });
  }

  getSocketURL() {
    return `${window.location.protocol}//${window.location.host}`;
  }

  join( accountId: string) {
    this.socket = io(this.getSocketURL(), {path: "/app/v1/socket.io"});
    this.socket.on('connect', () => {
      console.log("Connected", this.socket.id);
    });
    this.socket.on('connect_error', (data) => {
      console.log("connection error", data);
    });
    this.socket.on('disconnected', (data) => {
      console.log("Disconnected", data);
    });
    this.socket.emit('join', accountId);
    _.each(ValidEventTypes, type => {
      this.socket.on(type, data => {
        console.log("Event User");
        this.event$.next({type: type, data: data})
      })
    });
  }

  close() {
    this.socket.close();
  }

  on(eventType: string) {
    return this.event$
      .filter((eventBus: EventBus) => {
        console.log("Event bus", eventBus);
        return !!eventBus
      })
      .filter((eventBus: EventBus) => {
        return (eventBus.type == eventType);
      })
      .map((eventBus: EventBus) => {
        return eventBus;
      });
  }
}

interface EventBus {
  type: string,
  data: any
}

export const ValidEventTypes = [
  'tracking.started',
  'user.created',
  'action.assigned'
];
