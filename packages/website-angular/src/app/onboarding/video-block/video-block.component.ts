import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.less']
})
export class VideoBlockComponent implements OnInit {

  @Input() content;
  constructor() { }
  ngOnInit() {
  }

}
