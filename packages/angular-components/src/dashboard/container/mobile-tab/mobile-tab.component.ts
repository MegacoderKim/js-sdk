import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mobile-tab',
  templateUrl: './mobile-tab.component.html',
  styleUrls: ['../filter.less', './mobile-tab.component.less']
})
export class MobileTabComponent implements OnInit {
  @Input() showFilter: boolean;
  showSearch: boolean = false;
  showOptions: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  goBack() {
    if(history) {
      history.back()
    }
  }
}
