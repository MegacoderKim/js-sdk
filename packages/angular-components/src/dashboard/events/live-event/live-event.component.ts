import {Component, OnInit, Input} from '@angular/core';
import {CardComponent} from "../../shared/card/card.component";
import {IEvent} from "ht-models";

@Component({
  selector: 'app-live-event',
  templateUrl: './live-event.component.html',
  styleUrls: ['./live-event.component.less']
})
export class LiveEventComponent extends CardComponent implements OnInit {
  @Input() event: IEvent;

  ngOnInit() {
  }

}
