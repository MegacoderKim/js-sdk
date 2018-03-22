import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-developer-box',
  templateUrl: './not-developer-box.component.html',
  styleUrls: ['./not-developer-box.component.less']
})
export class NotDeveloperBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMailToDeveloper() {
    $("#mail-to-developer").modal();
  }

}
