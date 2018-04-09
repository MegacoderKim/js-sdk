import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track-options',
  templateUrl: './track-options.component.html',
  styleUrls: ['./track-options.component.less']
})
export class TrackOptionsComponent implements OnInit {

  @Input() content;
  constructor() { }
  ngOnInit() {
  }

}
