import {IEvent} from "ht-models";

export class HtEvent {
  constructor(event?: IEvent) {}
}

export const htEvent = (event?: IEvent) => new HtEvent(event);