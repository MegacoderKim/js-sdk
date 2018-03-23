import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.less']
})
export class SummaryCardComponent implements OnInit {

  @Input() label: string = '';
  @Input() value: string = '';
  constructor() { }

  ngOnInit() {
  }

}
