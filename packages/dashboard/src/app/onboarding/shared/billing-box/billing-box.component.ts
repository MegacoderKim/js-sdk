import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-box',
  templateUrl: './billing-box.component.html',
  styleUrls: ['./billing-box.component.less']
})
export class BillingBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openBillingModal() {
    $("#billing-modal").modal();
  }

}
