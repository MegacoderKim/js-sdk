import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.less']
})
export class VideoModalComponent implements OnInit {
  modalId: string = 'videoModal';
  @Input() videoSrc: string = '';
  constructor() { }

  ngOnInit() {
  }

}
