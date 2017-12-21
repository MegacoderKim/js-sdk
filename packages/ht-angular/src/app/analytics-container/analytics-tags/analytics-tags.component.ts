import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ht-analytics-tags',
  templateUrl: './analytics-tags.component.html',
  styleUrls: ['./analytics-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsTagsComponent implements OnInit {
  @Input() tags: string[];
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
