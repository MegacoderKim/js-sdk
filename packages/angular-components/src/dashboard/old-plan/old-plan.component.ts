import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';

@Component({
  selector: 'app-old-plan',
  templateUrl: './old-plan.component.html',
  styleUrls: ['./old-plan.component.less']
})
export class OldPlanComponent implements OnInit {

  isCardAdded: boolean = false;
  addAddress: boolean = false;
  constructor(
    public location: Location
  ) { }

  ngOnInit() {

  }

  close() {
    this.location.back()
  }

}
